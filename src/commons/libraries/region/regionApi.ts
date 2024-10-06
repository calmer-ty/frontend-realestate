import axios from "axios";
import type { IRegionData } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const regionApi = async (city: string): Promise<IRegionData> => {
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  const reginCdUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;

  try {
    const response = await axios.get(reginCdUrl);

    return response.data;
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw error;
  }
};
