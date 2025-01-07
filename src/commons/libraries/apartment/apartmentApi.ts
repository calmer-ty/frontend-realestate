import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_NUMBER_VALUE } from "@/src/commons/constants";
import type { IApartment, IApartmentItem } from "@/src/commons/types";
// import type { AxiosResponse } from "axios";

// import pLimit from "p-limit";
// const limit = pLimit(50);

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
  // numRows 50개 마다의 데이터
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  const isValidData = (el: IApartmentItem): boolean => el.estateAgentSggNm?.trim() !== "" && el.umdNm?.trim() !== "" && el.dealAmount?.trim() !== "";

  return items
    .filter(isValidData) // isValidData 함수로 필터링
    .map((item) => {
      // 쉼표가 있는 경우 이후의 값만 저장, 없는 경우 원래 값을 유지
      const updatedItem = { ...item };
      if (item?.estateAgentSggNm?.includes(",") === true) {
        updatedItem.estateAgentSggNm = item.estateAgentSggNm.split(",").slice(1).join(",").trim();
      }

      const filteredItem: Partial<IApartmentItem> = {};

      Object.keys(item).forEach((key) => {
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
        console.log(`Filtering out older item:`, `${existingItem.umdNm}_${existingItem.jibun}_${existingItem.aptNm}__${existingItem.dealYear}${existingItem.dealMonth}${existingItem.dealDay}`); // 필터링된 이전 데이터
        console.log(`Keeping newer item:`, `${item.umdNm}_${item.jibun}_${item.aptNm}__${item.dealYear}${item.dealMonth}${item.dealDay}`); // 필터링되는 최신 데이터
        grouped.set(key, item);
      } else {
        console.log(`Skipping item:`, `${item.umdNm}_${item.jibun}_${item.aptNm}__${item.dealYear}${item.dealMonth}${item.dealDay}`); // 업데이트되지 않은 데이터 (필터링되지 않음)
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

    const latestData: IApartmentItem[] = [];

    // 페이지별로 요청 처리
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const url = createApiUrl(regionCode, pageNo);

      // 아파트 데이터 요청
      const response = await axios.get<IApartment | undefined>(url);

      // 데이터 처리
      const items = processResponseData(response.data);

      // 최신 데이터 필터링 후 합침
      const filteredData = getLatestData(items);
      latestData.push(...filteredData);
    }

    return latestData;
  } catch (error) {
    handleError(error, "apartmentApi"); // 에러 처리
    return [];
  }
};
