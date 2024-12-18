import axios from "axios";

import type { AxiosResponse } from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

// import pLimit from "p-limit";
// const limit = pLimit(100);

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const regionApi = async (city: string): Promise<string[]> => {
  const apiUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${API_KEY}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
  const numOfRows = 100;

  try {
    const initialResponse = await axios.get<IRegion | undefined>(`${apiUrl}&pageNo=1&numOfRows=${numOfRows}`);
    const totalCount = initialResponse.data?.StanReginCd?.[0]?.head?.[0].totalCount; // row 데이터 추출
    if (totalCount === undefined) {
      throw new Error("totalCount 값을 가져올 수 없습니다.");
    }

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / numOfRows);

    const request: Array<Promise<AxiosResponse<IRegion | undefined>>> = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const reginCdUrl = `${apiUrl}&pageNo=${pageNo}&numOfRows=${numOfRows}`;

      // request.push(limit(() => axios.get<IRegion | undefined>(reginCdUrl))); // limit으로 요청 제한
      request.push(axios.get<IRegion | undefined>(reginCdUrl)); // limit으로 요청 제한
    }

    const regionCodeObject = new Set<string>();

    // 병렬로 모든 요청을 보내고 응답을 기다림
    const responses = await Promise.all(request);
    responses.forEach((response) => {
      const rows = response.data?.StanReginCd?.[1]?.row ?? [];
      rows.forEach((row) => {
        const regionCode = row.region_cd?.slice(0, 5); // 지역 코드의 앞 5자리만 사용
        if (regionCode !== undefined && !regionCode.endsWith("000")) {
          regionCodeObject.add(regionCode);
        }
      });
    });

    console.log("Array.from(regionCodeObject) === ", Array.from(regionCodeObject));
    return Array.from(regionCodeObject); // 중복 제거된 숫자 배열만 반환
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw new Error("지역 API 로딩 실패");
  }
};
