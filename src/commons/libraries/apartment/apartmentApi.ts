import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IApartment, IApartmentItem } from "@/src/commons/types";
import type { AxiosResponse } from "axios";

// import pLimit from "p-limit";
// const limit = pLimit(50);

// API 설정 상수
const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade";
const NUM_OF_ROWS = 50;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

// console.log("seen === ", seen);

const createApiUrl = (regionCode: string, pageNo: number): string => {
  const currentDate = getCurrentDate();
  return `${BASE_URL}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
};

const processResponseData = (data: IApartment | undefined, seen: Set<string>): Array<Partial<IApartmentItem>> => {
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  return items
    .filter((item) => {
      const uniqueKey = `${item.umdNm}_${item.jibun}_${item.aptNm}_${item.excluUseAr}`;
      // 중복 체크 및 조건 필터링
      if (seen.has(uniqueKey)) {
        return false;
      }
      seen.add(uniqueKey); // 새로운 아이템은 Set에 추가
      return true; // 필터링된 항목만 반환
    })
    .map((item) => {
      // estateAgentSggNm이 공백일 경우
      if (item.estateAgentSggNm !== undefined && item.estateAgentSggNm.trim() === "") {
        return null; // null 반환
      }
      // estateAgentSggNm 값에 쉼표가 있는 경우 이후의 값만 저장
      if (item?.estateAgentSggNm?.includes(",") === true) {
        item.estateAgentSggNm = item.estateAgentSggNm.split(",").slice(1).join(",").trim();
      }

      const filteredItem: Partial<IApartmentItem> = {};

      // 필요없는 객체 키 제거
      Object.keys(item).forEach((key) => {
        if (!FIELDS_TO_EXCLUDE.includes(key)) {
          filteredItem[key] = item[key];
        }
      });

      return filteredItem;
    })
    .filter((item) => item !== null)
    .filter((item) => Object.keys(item).length > 0);
};

// 최신 데이터 필터링 함수
export const getLatestData = (items: IApartmentItem[]): IApartmentItem[] => {
  const grouped: Record<string, IApartmentItem> = {};

  items.forEach((item) => {
    const key = `${item.umdNm}_${item.jibun}_${item.aptNm}`;
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
        grouped[key] = item;
      }
    }
  });

  const filteredData = Object.values(grouped);

  return filteredData;
};

// 모든 페이지에 대한 요청을 순차적으로 처리
const getRequestPages = async (regionCode: string, totalPages: number, request: Array<Promise<AxiosResponse<IApartment | undefined, any>>>): Promise<void> => {
  const requestedPages = new Set<number>();
  for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
    if (!requestedPages.has(pageNo)) {
      // console.log(`요청: 페이지 번호 ${pageNo}`);
      requestedPages.add(pageNo);
      request.push(axios.get<IApartment | undefined>(createApiUrl(regionCode, pageNo)));
    } else {
      // console.log(`중복 요청: 페이지 번호 ${pageNo}`);
    }
  }
};

// 메인 함수
export const apartmentApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl(regionCode, 1);
    const initialResponse = await axios.get<IApartment | undefined>(initialUrl);

    const totalCount = initialResponse.data?.response?.body?.totalCount ?? 0;
    if (totalCount === 0) {
      // console.warn("apartmentApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.max(1, Math.ceil(totalCount / NUM_OF_ROWS));

    // 요청 페이지 생성: 각 페이지에 대한 요청을 순차적으로 생성하여 `request` 배열에 Promise 추가
    const request: Array<Promise<AxiosResponse<IApartment | undefined>>> = [];
    await getRequestPages(regionCode, totalPages, request);

    // 정제되지 않은 데이터 처리 및 병렬 요청: `request` 배열에 담긴 모든 요청을 병렬로 처리하여 응답을 가져옴
    const responses = await Promise.all(request);
    // `responses`는 각 페이지에서 받은 데이터가 담긴 배열로, 각 응답의 `data`는 `IApartment` 형식

    // 응답 데이터를 정제: 각 응답의 데이터를 `processResponseData()` 함수로 정제하여 중복 제거 및 불필요한 필드 제외
    const allItems = responses.flatMap((response) => {
      const seen = new Set<string>(); // 각 response마다 중복을 제거할 Set 생성
      return processResponseData(response.data, seen); // 각 응답에 대해 중복 제거 후 반환
    });
    // `allItems`는 `processResponseData()` 함수를 통해 정제된 아파트 데이터들의 배열

    // 최신 데이터 필터링: 정제된 데이터 중에서 최신 항목만 필터링
    const latestData = getLatestData(allItems);

    return latestData;
  } catch (error) {
    handleError(error, "apartmentApi"); // 에러 처리
    return [];
  }
};
