import axios from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;

export const regionApi = async (city: string): Promise<IRegion> => {
  // ============================================== page로 구분하는 로직 연구중
  const reginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
  const numOfRows = 10;
  const delay = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    const initialResponse = await axios.get<IRegion>(`${reginCdUrl}&pageNo=1&numOfRows=${numOfRows}`);

    const totalCount = initialResponse.data.StanReginCd?.[0]?.head?.[0].totalCount; // row 데이터 추출

    if (totalCount === undefined) {
      throw new Error("totalCount 값을 가져올 수 없습니다.");
    }

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / numOfRows);

    const requests = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      const reginCdUrl2 = `${reginCdUrl}&pageNo=${pageNo}&numOfRows=${numOfRows}`;
      requests.push(axios.get<IRegion>(reginCdUrl2)); // 각 요청을 배열에 추가
      await delay(50); // 딜레이를 주어 요청을 천천히 처리하도록 합니다
    }

    try {
      // 병렬로 모든 요청을 보내고 응답을 기다림
      const responses = await Promise.all(requests);
      const regionCodes = new Set<string>();

      responses.forEach((response, index) => {
        const row = response.data.StanReginCd?.[1].row;
        row?.forEach((el) => {
          regionCodes.add(el.region_cd?.slice(0, 5) ?? ""); // Set에 추가
        });
      });

      // Set을 배열로 변환
      const regionCodesArray = Array.from(regionCodes);
      console.log(`중복 제거된 ${city}의 region_cd 목록:`, regionCodesArray);
    } catch (error) {
      console.error("병렬 요청 중 에러 발생:", error);
    }
    // ============================================== page로 구분하는 로직 연구중

    // ============================================== 현재 사용하는 API 로직
    const reginCdUrlTest = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
    const response = await axios.get<IRegion>(reginCdUrlTest);

    return response.data;
    // ============================================== 현재 사용하는 API 로직
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw error;
  }
};
