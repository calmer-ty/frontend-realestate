import axios from "axios";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { DEFAULT_STRING_VALUE } from "../../constants";
import type { IRegion, IRegionItem } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

import pLimit from "p-limit";
const limit = pLimit(10); // 병렬 요청 수를 10개로 제한

const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
const NUM_OF_ROWS = 100;

const createApiUrl = (city: string, pageNo: number): string => {
  return `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=${pageNo}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
};

// 특정 페이지 데이터 요청
const fetchPageData = async (city: string, pageNo: number): Promise<IRegion | undefined> => {
  try {
    const url = createApiUrl(city, pageNo);
    const response = await axios.get<IRegion | undefined>(url);
    return response.data;
  } catch (error) {
    handleError(error, "fetchPageData");
    return undefined;
  }
};

// 지역 코드 추출 및 필터링
const processRegionData = (rows: IRegionItem[]): Map<string, { locationName: string; regionCode: string }> => {
  const regionCodeMap = new Map<string, { locationName: string; regionCode: string }>();
  rows.forEach((el) => {
    const locationName = el.locatadd_nm;
    const regionCode = (el.sido_cd ?? DEFAULT_STRING_VALUE) + (el.sgg_cd ?? DEFAULT_STRING_VALUE);
    // 시 구까지 나온 데이터 - 뽑아야할 값
    const validUmdCd = el.umd_cd === "000";
    const validSggCd = el.sgg_cd !== "000";
    if (locationName !== undefined && regionCode !== undefined && validUmdCd && validSggCd) {
      // 객체를 Map에 저장
      regionCodeMap.set(`${regionCode}_${locationName}`, {
        locationName,
        regionCode,
      });
    }
  });
  return regionCodeMap;
};

const getUniqueRegionCodes = async (city: string, totalPages: number): Promise<Map<string, { locationName: string; regionCode: string }>> => {
  // 병렬로 요청 보내기
  const requests = Array.from({ length: totalPages }, (_, i) => limit(() => fetchPageData(city, i + 1)));
  const responses = await Promise.all(requests);

  const regionCodeMap = new Map<string, { locationName: string; regionCode: string }>();

  responses.forEach((response) => {
    const rows = response?.StanReginCd?.[1]?.row ?? [];
    const filteredCodes = processRegionData(rows);

    // Map에서 각 regionCode와 locationName을 추가
    filteredCodes.forEach((value, key) => {
      regionCodeMap.set(key, { locationName: value.locationName, regionCode: value.regionCode });
    });
  });

  return regionCodeMap;
};
export const regionApi = async (city: string): Promise<Array<{ locationName: string; regionCode: string }>> => {
  try {
    const initialUrl = createApiUrl(city, 1);
    // const initialUrl = createApiUrl(`서울특별시`, 1);
    const initialResponse = await axios.get<IRegion | undefined>(initialUrl);

    const totalCount = initialResponse.data?.StanReginCd?.[0]?.head?.[0].totalCount ?? 0; // row 데이터 추출
    if (totalCount === undefined) {
      console.warn("regionApi - 총 데이터 개수가 없습니다.");
      return [];
    }

    const totalPages = Math.ceil(totalCount / NUM_OF_ROWS);
    const regionCodeMap = await getUniqueRegionCodes(city, totalPages);
    // const regionCodes = await getUniqueRegionCodes(`서울특별시`, totalPages);

    // Map에서 regionCode와 locataddNm을 각각 배열로 추출
    const result = Array.from(regionCodeMap.values()).map((item) => ({
      locationName: item.locationName,
      regionCode: item.regionCode,
    }));

    return result; // 각각 따로 배열로 반환
    // return Array.from(regionCodes); // 중복 제거된 숫자 배열만 반환
  } catch (error) {
    handleError(error, "regionApi"); // 에러 처리
    return [];
  }
};
