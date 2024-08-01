import axios from "axios";
import type { IApartmentData, IRegionItem } from "@/src/commons/types"; // 지역 데이터 타입 정의를 가져옵니다

const API_KEY = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

export const apartmentApi = async (result: IRegionItem): Promise<IApartmentData> => {
  // 캐시에 없는 경우 실제 데이터를 요청합니다
  const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=${result.region_cd}&DEAL_YMD=201512&serviceKey=${API_KEY}`;
  const response = await axios.get(apartmentUrl);
  return response.data;
};
