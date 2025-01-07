import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IApartment, IApartmentItem } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(50);

// API 설정 상수
const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade";
const NUM_OF_ROWS = 50;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

const createApiUrl = (regionCode: string, pageNo: number): string => {
  const currentDate = getCurrentDate();
  return `${BASE_URL}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
};

const processResponseData = (data: IApartment | undefined): Array<Partial<IApartmentItem>> => {
  // 아이템 배열 추출
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  // 유효한 데이터 필터링
  const isValidData = (el: IApartmentItem): boolean => el.estateAgentSggNm?.trim() !== "" && el.umdNm?.trim() !== "" && el.dealAmount?.trim() !== "";

  return items.filter(isValidData).map((item) => {
    const updatedItem = { ...item };

    // estateAgentSggNm에서 쉼표가 포함된 경우, 쉼표 이후의 값만 취합니다.
    if (item?.estateAgentSggNm?.includes(",") === true) {
      updatedItem.estateAgentSggNm = item.estateAgentSggNm.split(",").slice(1).join(",").trim();
    }

    const filteredItem: Partial<IApartmentItem> = {};
    Object.keys(item).forEach((key) => {
      // 불필요한 필드 제거
      if (!FIELDS_TO_EXCLUDE.includes(key)) {
        filteredItem[key] = item[key];
      }
    });

    return filteredItem;
  });
};

// 최신 데이터 필터링 함수
export const getLatestData = (items: IApartmentItem[]): IApartmentItem[] => {
  const grouped: Map<string, IApartmentItem> = new Map<string, IApartmentItem>();

  items.forEach((item) => {
    const key = `${item.umdNm}_${item.jibun}_${item.aptNm}`;
    const existingItem = grouped.get(key);

    if (existingItem === undefined) {
      grouped.set(key, item);
    } else {
      const isNewer =
        // 연도 비교
        (item.dealYear ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealYear ?? DEFAULT_NUMBER_VALUE) ||
        // 연도가 같고, 월 비교
        (item.dealYear === existingItem.dealYear && (item.dealMonth ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealMonth ?? DEFAULT_NUMBER_VALUE)) ||
        // 연도, 월이 같고, 날 비교
        (item.dealYear === existingItem.dealYear && item.dealMonth === existingItem.dealMonth && (item.dealDay ?? DEFAULT_NUMBER_VALUE) > (existingItem.dealDay ?? DEFAULT_NUMBER_VALUE));

      if (isNewer) {
        // console.log(`Filtering out older item:`, `${existingItem.umdNm}_${existingItem.jibun}_${existingItem.aptNm}__${existingItem.dealYear}${existingItem.dealMonth}${existingItem.dealDay}`); // 필터링된 이전 데이터
        // console.log(`Keeping newer item:`, `${item.umdNm}_${item.jibun}_${item.aptNm}__${item.dealYear}${item.dealMonth}${item.dealDay}`); // 필터링되는 최신 데이터
        grouped.set(key, item);
      } else {
        // console.log(`Skipping item:`, `${item.umdNm}_${item.jibun}_${item.aptNm}__${item.dealYear}${item.dealMonth}${item.dealDay}`); // 업데이트되지 않은 데이터 (필터링되지 않음)
      }
    }
  });

  return Array.from(grouped.values());
};

// 메인 함수
export const apartmentApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl(regionCode, 1);
    const initialResponse = await axios.get<IApartment | undefined>(initialUrl);
    // const seenPages = new Set<string>(); // 이미 처리한 regionCode를 기록할 Set

    const totalCount = initialResponse.data?.response?.body?.totalCount ?? 0;
    if (totalCount === 0) {
      // console.warn("apartmentApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.max(1, Math.ceil(totalCount / NUM_OF_ROWS));

    // 병렬 요청을 위한 페이지 번호 배열 생성
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // 페이지 요청을 병렬로 실행
    const requests = pageNumbers.map((pageNo) =>
      limit(async () => {
        const url = createApiUrl(regionCode, pageNo);
        const response = await axios.get<IApartment | undefined>(url);
        return processResponseData(response.data);
      })
    );

    const allItems = await Promise.all(requests);

    // 모든 데이터를 하나로 합치고 최신 데이터만 추출
    const latestData = getLatestData(allItems.flat());

    return latestData;
  } catch (error) {
    handleError(error, "apartmentApi"); // 에러 처리
    return [];
  }
};
