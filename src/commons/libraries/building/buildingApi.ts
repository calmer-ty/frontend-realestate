import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import { handleError } from "@/src/commons/libraries/utils/handleError";
import pLimit from "p-limit";

import type { IBuilding, IBuildingItem, IBuildingDataParams } from "@/src/commons/types";
interface ICreateApiUrlParams {
  regionCode: string;
  buildingType: string;
  pageNo: number;
}

const limit = pLimit(10);

// API 설정 상수
const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;

const APARTMENT_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade";
const OFFICETEL_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcOffiTrade/getRTMSDataSvcOffiTrade";
const HOUSE_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcSHTrade/getRTMSDataSvcSHTrade";
const FAMILYHOUSING_URL = "https://apis.data.go.kr/1613000/RTMSDataSvcRHTrade/getRTMSDataSvcRHTrade";
const API_URLS = {
  apartment: APARTMENT_URL,
  officetel: OFFICETEL_URL,
  house: HOUSE_URL,
  familyHousing: FAMILYHOUSING_URL,
  // 추가적인 URL이 있을 경우 여기에 추가
};

const NUM_OF_ROWS = 10;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["estateAgentSggNm", "buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

const createApiUrl = ({ regionCode, buildingType, pageNo }: ICreateApiUrlParams): string => {
  const currentDate = getCurrentDate();
  const baseUrl = API_URLS[buildingType as "apartment" | "officetel"];

  if (typeof baseUrl !== "string") {
    throw new Error(`잘못된 buildingType: ${buildingType}`);
  }

  return `${baseUrl}?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=${pageNo}&numOfRows=${NUM_OF_ROWS}`;
};

const processResponseData = (data: IBuilding | undefined, regionName: string): IBuildingItem[] => {
  // 아이템 배열 추출
  const itemsRaw = data?.response?.body?.items?.item ?? [];
  const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];

  // 유효한 데이터 필터링
  const isValidData = (el: IBuildingItem): boolean => el.umdNm?.trim() !== "" && el.dealAmount?.trim() !== "";
  // && !el.estateAgentSggNm?.includes(",")

  // 필드 필터링 함수
  const filterItemFields = (item: IBuildingItem): IBuildingItem => {
    const filteredItem: IBuildingItem = {
      regionName,
      umdNm: "",
      jibun: "",
      floor: 0,
      dealAmount: "",
      excluUseAr: 0,
      dealDay: 0,
      dealMonth: 0,
      dealYear: 0,
      buildYear: 0,
      rgstDate: "",

      // 건물 이름
      aptNm: "",
      offiNm: "",
      mhouseNm: "",
    };
    // item의 각 속성을 filteredItem에 덮어쓰기
    for (const key in item) {
      if (!FIELDS_TO_EXCLUDE.includes(key)) {
        filteredItem[key as keyof IBuildingItem] = item[key];
      }
    }
    return filteredItem;
  };

  return items
    .filter(isValidData) // 유효한 데이터만 필터링
    .map(filterItemFields); // 각 아이템에서 불필요한 필드 제거
};

// 최신 데이터 필터링 함수
export const getLatestData = (items: IBuildingItem[]): IBuildingItem[] => {
  const grouped: Map<string, IBuildingItem> = new Map<string, IBuildingItem>();

  items.forEach((item) => {
    const key = `${item.umdNm}_${item.jibun}`;
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
export const buildingApi = async ({ regionCode, regionName, buildingType }: IBuildingDataParams): Promise<IBuildingItem[]> => {
  try {
    // 첫 번째 요청으로 총 페이지 수 계산
    const initialUrl = createApiUrl({ regionCode, buildingType, pageNo: 1 });
    const initialResponse = await axios.get<IBuilding | undefined>(initialUrl);
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
        const url = createApiUrl({ regionCode, pageNo, buildingType });
        const response = await axios.get<IBuilding | undefined>(url);
        const data = processResponseData(response.data, regionName);

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
