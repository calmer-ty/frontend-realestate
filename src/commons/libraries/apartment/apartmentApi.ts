import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import type { IApartment } from "@/src/commons/types";

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const apartmentApi = async (regionCode: string): Promise<IApartment> => {
  // console.log("[region] ", region);
  const currentDate = getCurrentDate();
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  const apartmentUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${regionCode}&DEAL_YMD=${currentDate}&pageNo=1&numOfRows=10`;
  const response = await axios.get<IApartment>(apartmentUrl);

  // console.log("[apartment Data] ", response.data);
  // console.log("[Apartment Data Item] ", response.data.response?.body?.items?.item);

  return response.data;
};
