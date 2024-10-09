import axios from "axios";
import type { IRegion } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
const baseUrl = `http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList`;

export const regionApi = async (city: string): Promise<IRegion> => {
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  const reginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=10&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
  try {
    // totalCount 가져오기
    const response = await axios.get<IRegion>(reginCdUrl);
    const totalCount = Math.round(response?.data?.StanReginCd?.[0]?.head?.[0]?.totalCount ?? 0);
    // console.log("response?.data?.StanReginCd?.[0]?.head?.[0]?: ", response?.data?.StanReginCd?.[0]?.RESULT);

    const finalReginCdUrl = `${baseUrl}?ServiceKey=${API_KEY}&type=json&pageNo=1&numOfRows=${totalCount}&flag=Y&locatadd_nm=${encodeURIComponent(city)}`;
    const finalResponse = await axios.get<IRegion>(finalReginCdUrl);
    console.log("Second request response: ", finalResponse.data);

    return finalResponse.data;
  } catch (error) {
    console.error("API 요청 중 에러 발생:", error);
    throw error;
  }
};
