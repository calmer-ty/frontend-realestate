import axios from "axios";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { AxiosResponse } from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

import pLimit from "p-limit";
const limit = pLimit(50);

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const BASE_URL = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
const NUM_OF_ROWS = 50;

// 제외 필드 상수
const FIELDS_TO_EXCLUDE = ["aptDong", "buyerGbn", "cdealDay", "cdealType", "landLeaseholdGbn", "sggCd", "dealingGbn", "slerGbn", "rgstDate"]; // 제외할 필드들

const createApiUrl = (city: string, pageNo: number): string => {
  return `${BASE_URL}?ServiceKey=${API_KEY}&pageNo=${pageNo}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
};

const extractRegionCodes = (responses: Array<AxiosResponse<IRegion | undefined, any>>): Set<string> => {
  const regionCodeObject = new Set<string>();

  responses.forEach((response) => {
    const rows = response.data?.StanReginCd?.[1]?.row ?? [];
    console.log("rows === ", rows);
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
    const initialUrl = createApiUrl(`경기도`, 1);
    const initialResponse = await axios.get<IRegion | undefined>(initialUrl);

    const totalCount = initialResponse.data?.StanReginCd?.[0]?.head?.[0].totalCount ?? 0; // row 데이터 추출
    if (totalCount === undefined) {
      console.warn("regionApi - 총 데이터 개수가 없습니다.");
    }

    const totalPages = Math.ceil(totalCount / NUM_OF_ROWS);
    const request: Array<Promise<AxiosResponse<IRegion | undefined>>> = [];

    // 모든 페이지에 대한 요청 생성
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      request.push(limit(() => axios.get<IRegion | undefined>(createApiUrl(`경기도`, pageNo))));
    }

    // 요청 병렬 처리
    const responses = await Promise.all(request);

    // extractRegionCodes 함수 사용
    const regionCodeObject = extractRegionCodes(responses);

    return Array.from(regionCodeObject); // 중복 제거된 숫자 배열만 반환
  } catch (error) {
    handleError(error, "regionApi"); // 에러 처리
    return [];
  }
};
