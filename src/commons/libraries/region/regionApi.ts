import axios from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;

export const regionApi = async (city: string): Promise<IRegion> => {
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  let numOfRows = 10; // 초기 값
  const maxMessageSize = 300;

  // `numOfRows` 조정 과정 디버깅
  console.log(`[DEBUG] Starting to calculate numOfRows for city: ${city}`);
  while (true) {
    const reginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=${numOfRows}&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;

    try {
      const response = await axios.get<IRegion>(reginCdUrl);
      const responseData = response.data;

      // 응답 크기 계산 및 로그
      const responseSize = JSON.stringify(responseData).length;
      console.log(`[DEBUG] numOfRows: ${numOfRows}, Response Size: ${responseSize} bytes`);

      // 크기 초과 시 처리
      if (responseSize > maxMessageSize) {
        console.log(`[DEBUG] Response size exceeded ${maxMessageSize} bytes, decreasing numOfRows`);
        numOfRows--;
        break;
      }
      console.log(`[DEBUG] Response size within limit, increasing numOfRows`);
      numOfRows++;
    } catch (error) {
      console.error(`[ERROR] Error while calculating numOfRows for city: ${city}`, error);
      throw error; // 오류 발생 시 중단
    }
  }

  const reginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=20&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
  try {
    // 첫 번째 API 호출
    // totalCount 가져오기 - totalCount를 알려면, api를 먼저 한번 실행해보아야 한다.
    const response = await axios.get<IRegion>(reginCdUrl);

    return response.data;
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw error;
  }
};
