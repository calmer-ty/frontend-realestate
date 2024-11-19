import axios from "axios";
import { getCurrentDate } from "@/src/commons/libraries/utils/currentDate";
import type { IApartment, IRegionItem } from "@/src/commons/types";

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const apartmentApi = async (result: IRegionItem): Promise<IApartment> => {
  const currentDate = getCurrentDate();
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  // const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=${result.region_cd}&DEAL_YMD=${currentDate}&serviceKey=${API_KEY}`;
  const apartmentUrl = `https://apis.data.go.kr/1613000/RTMSDataSvcAptTrade/getRTMSDataSvcAptTrade?serviceKey=${API_KEY}&LAWD_CD=${result.region_cd}&DEAL_YMD=${currentDate}&pageNo=1&numOfRows=5`;
  const response = await axios.get(apartmentUrl);

  return response.data;
};
