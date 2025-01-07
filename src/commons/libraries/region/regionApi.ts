import axios from "axios";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

import pLimit from "p-limit";
const limit = pLimit(10); // 병렬 요청 수를 10개로 제한

const API_KEY = process.env.GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
const NUM_OF_ROWS = 50;

const createApiUrl = (city: string, pageNo: number): string => {
  return `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=${pageNo}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
};

const getUniqueRegionCodes = async (totalPages: number, fetchPageData: (pageNo: number) => Promise<IRegion | undefined>): Promise<Set<string>> => {
  const regionCodeObject = new Set<string>();

  // 병렬로 요청 보내기
  const requests = Array.from(
    { length: totalPages },
    (_, pageNo) => limit(() => fetchPageData(pageNo + 1)) // 페이지 번호 1부터 시작
  );

  const responses = await Promise.all(requests);

  responses.forEach((response) => {
    const rows = response?.StanReginCd?.[1]?.row ?? [];

    rows.forEach((row) => {
      const regionCode = row.region_cd?.slice(0, 5); // 지역 코드의 앞 5자리만 사용
      if (regionCode !== undefined && !regionCode.endsWith("000")) {
        regionCodeObject.add(regionCode);
      }
    });
  });

  return regionCodeObject;
};
export const regionApi = async (city: string): Promise<string[]> => {
  try {
    const initialUrl = createApiUrl(`서울특별시`, 1);
    // const initialUrl = createApiUrl(city, 1);
    const initialResponse = await axios.get<IRegion | undefined>(initialUrl);

    const totalCount = initialResponse.data?.StanReginCd?.[0]?.head?.[0].totalCount ?? 0; // row 데이터 추출
    if (totalCount === undefined) {
      console.warn("regionApi - 총 데이터 개수가 없습니다.");
    }

    const totalPages = Math.ceil(totalCount / NUM_OF_ROWS);

    const regionCodeObject = await getUniqueRegionCodes(totalPages, async (pageNo) => {
      const url = createApiUrl(`서울특별시`, pageNo);
      const response = await axios.get<IRegion | undefined>(url);
      return response.data;
    });

    return Array.from(regionCodeObject); // 중복 제거된 숫자 배열만 반환
  } catch (error) {
    handleError(error, "regionApi"); // 에러 처리
    return [];
  }
};
