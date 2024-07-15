import { regionAllData } from "./regionData";

import axios from "axios";
import type { IApartmentLocationData } from "@/src/types";

import NodeCache from "node-cache";

// 데이터를 캐시할 NodeCache 인스턴스를 TTL이 7200초(2시간)로 초기화합니다
const cache = new NodeCache({ stdTTL: 7200 });

export const apartmentData = async (): Promise<IApartmentLocationData[]> => {
  try {
    const regionResults = await regionAllData();

    const cacheKeyPrefix = "apartmentData_";
    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;

    const apartmentDataPromises = regionResults.map((result) => {
      const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=${result.region_cd}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;
      const cacheKey = cacheKeyPrefix + result.region_cd;

      // 캐시에서 데이터를 가져오거나 새로 요청하여 캐시에 저장합니다
      const cachedData = cache.get<IApartmentLocationData>(cacheKey);
      if (cachedData !== undefined) {
        console.log(`지역 코드 ${result.region_cd}에 대한 아파트 데이터 캐시 히트`);
        return Promise.resolve(cachedData); // 캐시된 데이터가 있으면 즉시 반환합니다
      }

      // 캐시에 없는 경우 실제 데이터를 요청합니다
      return axios
        .get(apartmentUrl)
        .then((response) => {
          const apartmentData = response.data;

          // 여기서 result에 locatadd_nm을 추가하여 캐시에 같이 저장할 수 있습니다
          const apartmentLocationData: IApartmentLocationData = {
            apartmentData,
            locatadd_nm: result.locatadd_nm,
          };

          // 데이터를 캐시에 저장합니다
          cache.set(cacheKey, apartmentLocationData);
          return apartmentLocationData;
        })
        .catch((error) => {
          console.error(`지역 코드 ${result.locatadd_nm}에 대한 데이터를 가져오는 중 에러 발생:`, error);
          throw error; // 에러를 상위로 전파합니다
        });
    });

    const dataPromises: IApartmentLocationData[] = await Promise.all(apartmentDataPromises);

    return dataPromises;
  } catch (error) {
    console.error(`지역 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
