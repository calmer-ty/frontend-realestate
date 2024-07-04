import { regionAllData } from "./regionData";

import axios from "axios";
import type { IApartmentData } from "../types";

import NodeCache from "node-cache";

// 데이터를 캐시할 NodeCache 인스턴스를 TTL이 7200초(2시간)로 초기화합니다
const cache = new NodeCache({ stdTTL: 7200 });

export const apartmentData = async (): Promise<any> => {
  // regionAllData 함수를 사용하여 모든 지역 데이터를 가져옵니다
  try {
    const cacheKey = "apartmentData";
    const cachedData = cache.get<IApartmentData>(cacheKey); // 캐시에서 데이터를 가져옵니다

    if (cachedData !== undefined) {
      console.log("아파트 데이터 캐시 히트");
      return cachedData; // 캐시된 데이터가 있으면 반환합니다
    }
    const regionResults = await regionAllData(); // regionAllData 함수 호출 및 결과를 기다립니다
    regionResults.forEach((result) => {
      result.StanReginCd[1].row.map((el) => {
        console.log(el.locatadd_nm, el.region_cd);
      }); // 각 지역 데이터에 대한 로깅
    });
    console.log("여기서 아파트 로직 모두 짜기"); // 아파트 데이터에 대한 로직을 구현할 예정임을 로깅합니다

    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?&LAWD_CD=11710&DEAL_YMD=201512&serviceKey=${apartmentKey}`;

    const response = await axios.get(apartmentUrl); // HTTP GET 요청을 보내 지역 데이터를 가져옵니다
    const apartmentData: IApartmentData = response.data; // 가져온 지역 데이터를 변수에 저장합니다

    cache.set(cacheKey, apartmentData, 7200); // 가져온 데이터를 캐시에 저장하며 TTL을 7200초(2시간)로 설정합니다

    return apartmentData; // 아파트 데이터를 반환합니다
  } catch (error) {
    console.error(`지역 데이터를 가져오는 중 에러 발생:`, error); // 지역 데이터를 가져오는 과정에서 발생한 에러를 콘솔에 로깅합니다
  }
};
