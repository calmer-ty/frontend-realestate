import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IApartment, IApartmentItem } from "@/src/commons/types";
import type { AxiosResponse } from "axios";

import pLimit from "p-limit";
const limit = pLimit(50);

// API 설정 상수
const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade";
const NUM_OF_ROWS = 50;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

const createApiUrl = (regionCode: string, pageNo: number): string => {
  const currentDate = getCurrentDate();
  return `${BASE_URL}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
};

const processResponseData = (data: IApartment | undefined): Array<Partial<IApartmentItem>> => {
  // numRows 50개 마다의 데이터
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  return items
    .filter((el) => el.estateAgentSggNm != null && el.estateAgentSggNm.trim() !== "" && el.umdNm !== undefined && el.umdNm.trim() !== "" && el.dealAmount != null && el.dealAmount.trim() !== "")
    .map((el) => {
      // 쉼표가 있는 경우 이후의 값만 저장, 없는 경우 원래 값을 유지
      if (el?.estateAgentSggNm?.includes(",") === true) {
        el.estateAgentSggNm = el.estateAgentSggNm.split(",").slice(1).join(",").trim();
      }

      const filteredItem: Partial<IApartmentItem> = {};

      Object.keys(el).forEach((key) => {
        if (!FIELDS_TO_EXCLUDE.includes(key)) {
          filteredItem[key] = el[key];
        }
      });

      return filteredItem;
    });
};

// 최신 데이터 필터링 함수
export const getLatestData = (items: IApartmentItem[]): IApartmentItem[] => {
  const grouped: Record<string, IApartmentItem> = {};

  items.forEach((item) => {
    const key = `${item.umdNm}_${item.jibun}_${item.aptNm}`; // 동, 지번, 아파트명 기준으로 그룹화
    if (grouped[key] == null) {
      grouped[key] = item;
    } else {
      const existingItem = grouped[key];

      const isNewer =
        // 연도 비교
        (item.dealYear ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealYear ?? DEFAULT_NUMBER_VALUE) ||
        // 연도가 같고, 월 비교
        (item.dealYear === existingItem.dealYear && (item.dealMonth ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealMonth ?? DEFAULT_NUMBER_VALUE)) ||
        // 연도, 월이 같고, 날 비교
        (item.dealYear === existingItem.dealYear && item.dealMonth === existingItem.dealMonth && (item.dealDay ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealDay ?? DEFAULT_NUMBER_VALUE));

      if (isNewer) {
        // console.log(`Filtering out older item:`, existingItem); // 필터링된 이전 데이터
        // console.log(`Keeping newer item:`, item); // 필터링되는 최신 데이터
        grouped[key] = item;
      } else {
        // console.log(`Skipping item:`, item); // 업데이트되지 않은 데이터 (필터링되지 않음)
      }
    }
  });

  return Object.values(grouped);
};

// 메인 함수
export const apartmentApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl(regionCode, 1);
    const initialResponse = await axios.get<IApartment | undefined>(initialUrl);
    const seenPages = new Set<string>(); // 이미 처리한 regionCode를 기록할 Set

    const totalCount = initialResponse.data?.response?.body?.totalCount ?? 0;
    if (totalCount === 0) {
      console.warn("apartmentApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.max(1, Math.ceil(totalCount / NUM_OF_ROWS));
    const request: Array<Promise<AxiosResponse<IApartment | undefined>>> = [];

    // 모든 페이지에 대한 요청 생성
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const pageKey = `${regionCode}_${pageNo}`;
      const url = createApiUrl(regionCode, pageNo);
      if (!seenPages.has(pageKey)) {
        seenPages.add(pageKey);
        request.push(limit(() => axios.get<IApartment | undefined>(url)));
      } else {
        console.log(`중복된 페이지 요청을 방지합니다: ${pageNo}`);
      }
    }

    // 요청 병렬 처리
    const responses = await Promise.all(request);

    // 모든 응답 데이터 처리 / pageNo마다 값이 나오고, pageNo마다 배열로 묶임, flatMap으로 pageNo마다 배열을 평탄화하여 하나의 배열로 만듦.
    const allItems = responses.flatMap((response) => processResponseData(response.data));

    // 최신 데이터만 필터링
    const latestData = getLatestData(allItems);

    return latestData;
  } catch (error) {
    handleError(error, "apartmentApi"); // 에러 처리
    return [];
  }
};
