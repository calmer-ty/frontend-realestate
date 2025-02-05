import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IApartment, IApartmentItem } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(10);

// API 설정 상수
const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "http://apis.data.go.kr/1613000/RTMSDataSvcOffiTrade/getRTMSDataSvcOffiTrade";
const NUM_OF_ROWS = 100;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

const createApiUrl = (regionCode: string, pageNo: number): string => {
  const currentDate = getCurrentDate();
  return `${BASE_URL}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
};

const processResponseData = (data: IApartment | undefined): IApartmentItem[] => {
  // 아이템 배열 추출
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  // 유효한 데이터 필터링
  const isValidData = (el: IApartmentItem): boolean => el.estateAgentSggNm?.trim() !== "" && el.umdNm?.trim() !== "" && el.dealAmount?.trim() !== "" && !el.estateAgentSggNm?.includes(",");

  // 필드 필터링 함수
  const filterItemFields = (item: IApartmentItem): IApartmentItem => {
    const filteredItem: IApartmentItem = {
      estateAgentSggNm: "",
      umdNm: "",
      jibun: "",
      aptNm: "",
      floor: 0,
      dealAmount: "",
      excluUseAr: 0,
      dealDay: 0,
      dealMonth: 0,
      dealYear: 0,
      buildYear: 0,
      rgstDate: "",
    };
    // item의 각 속성을 filteredItem에 덮어쓰기
    for (const key in item) {
      if (!FIELDS_TO_EXCLUDE.includes(key)) {
        filteredItem[key as keyof IApartmentItem] = item[key];
      }
    }
    return filteredItem;
  };

  return items
    .filter(isValidData) // 유효한 데이터만 필터링
    .map(filterItemFields); // 각 아이템에서 불필요한 필드 제거
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
        item.dealYear > existingItem.dealYear ||
        // 연도가 같고, 월 비교
        (item.dealYear === existingItem.dealYear && item.dealMonth > existingItem.dealMonth) ||
        // 연도, 월이 같고, 날 비교
        (item.dealYear === existingItem.dealYear && item.dealMonth === existingItem.dealMonth && item.dealDay > existingItem.dealDay);

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
export const officetelApi = async (regionCode: string): Promise<IApartmentItem[]> => {
  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl(regionCode, 1);
    const initialResponse = await axios.get<IApartment | undefined>(initialUrl);
    const totalCount = initialResponse.data?.response?.body?.totalCount ?? 0;
    if (totalCount === 0) {
      console.warn("officetelApi - 총 데이터 개수가 없습니다.");
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
        const data = processResponseData(response.data);

        return data;
      })
    );

    const allItems = await Promise.all(requests);

    // 모든 데이터를 하나로 합치고 최신 데이터만 추출
    const latestData = getLatestData(allItems.flat());
    return latestData;
  } catch (error) {
    handleError(error, "officetelApi"); // 에러 처리
    return [];
  }
};
