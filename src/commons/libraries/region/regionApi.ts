import axios from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;

export const regionApi = async (city: string): Promise<IRegion> => {
  // // 캐시에 없는 경우 실제 데이터를 요청합니다
  // let allData = [];
  // let pageNo = 1;
  // let hasMoreData = true;

  // // `numOfRows` 조정 과정 디버깅
  // while (hasMoreData) {
  //   try {
  //     console.log(`[DEBUG] Fetching data - Page: ${pageNo}`);
  //     const response = await axios.get(`${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=${pageNo}&numOfRows=20&flag=Y&locatadd_nm=${encodeURIComponent(city)}`);
  //     const data = response.data;

  //     // 현재 데이터 상태 디버깅
  //     console.log(`[DEBUG] Data received for page ${pageNo}:`, data);

  //     // 데이터가 있으면 누적
  //     if (data && data.length > 0) {
  //       allData = [...allData, ...data];
  //       console.log(`[DEBUG] Total items accumulated: ${allData.length}`);
  //       pageNo++;
  //     } else {
  //       console.log(`[DEBUG] No more data available. Stopping fetch.`);
  //       hasMoreData = false;
  //     }
  //   } catch (error) {
  //     console.error(`[ERROR] Error occurred on page ${pageNo}:`, error);
  //     throw error; // 에러 발생 시 중단
  //   }
  // }

  //  ==== 이부분은 지도에 출력되기 위해 임시로 로직을 설정했습니다. 테스트용에서는 이 로직을 무시해주세요
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
