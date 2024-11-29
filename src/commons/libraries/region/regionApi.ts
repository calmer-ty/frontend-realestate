import axios from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;

export const regionApi = async (city: string): Promise<IRegion> => {
  // ============================================== 테스트용
  const reginCdUrlTest = `${baseUrl}?ServiceKey=${API_KEY}&type=json&flag=Y&locatadd_nm=${encodeURIComponent("세종특별자치시")}`;
  const numOfRows = 10;
  const delay = (ms: number): Promise<unknown> => new Promise((resolve) => setTimeout(resolve, ms));
  try {
    console.time("Total Request Time");
    console.time("Initial Request");
    const initialResponse = await axios.get<IRegion>(`${reginCdUrlTest}&pageNo=1&numOfRows=${numOfRows}`);
    console.timeEnd("Initial Request");
    const totalCount = initialResponse.data.StanReginCd?.[0]?.head?.[0].totalCount; // row 데이터 추출

    if (totalCount === undefined) {
      throw new Error("totalCount 값을 가져올 수 없습니다.");
    }
    console.log(`[DEBUG] Total Count: ${totalCount}`);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalCount / numOfRows);

    const requests = [];
    for (let pageNo = 1; pageNo <= totalPages; pageNo++) {
      console.time(`Request for Page ${pageNo}`);
      const reginCdUrl2 = `${reginCdUrlTest}&pageNo=${pageNo}&numOfRows=${numOfRows}`;
      requests.push(axios.get<IRegion>(reginCdUrl2)); // 각 요청을 배열에 추가
      await delay(500); // 500ms의 딜레이를 주어 요청을 천천히 처리하도록 합니다
    }

    try {
      // 병렬로 모든 요청을 보내고 응답을 기다림
      const responses = await Promise.all(requests);

      responses.forEach((response, index) => {
        console.log(`[DEBUG] response.data === PageNo.${index + 1}`, response.data);
      });
    } catch (error) {
      console.error("병렬 요청 중 에러 발생:", error);
    }
    // console.log("[DEBUG] requests ", requests);

    // ============================================== 테스트용
    const reginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
    const response = await axios.get<IRegion>(reginCdUrl);

    return response.data;
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw error;
  }
};
