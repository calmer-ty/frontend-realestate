import { regionAllData } from "./regionData";

import axios from "axios";
import type { IApartmentData } from "../types";

import NodeCache from "node-cache";

// 데이터를 캐시할 NodeCache 인스턴스를 TTL이 7200초(2시간)로 초기화합니다
const cache = new NodeCache({ stdTTL: 7200 });

export const apartmentData = async (): Promise<IApartmentData[]> => {
  // regionAllData 함수를 사용하여 모든 지역 데이터를 가져옵니다
  try {
    const regionResults = await regionAllData(); // regionAllData 함수 호출 및 결과를 기다립니다

    const regionCds = regionResults.flatMap(
      (result) =>
        result.StanReginCd[1].row.map((el) => el.region_cd.slice(0, 5)) ?? []
    );

    // 중복 제거
    const uniqueRegionCds = Array.from(new Set(regionCds));

    const cacheKeyPrefix = "apartmentData_";

    // 아파트 api
    const apartmentKey = process.env.NEXT_PUBLIC_GOVERNMENT_PUBLIC_DATA;
    const apartmentDataPromises = uniqueRegionCds.map((regionCd) => {
      const apartmentUrl = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?LAWD_CD=${regionCd}&DEAL_YMD=201512&serviceKey=${apartmentKey}`;
      const cacheKey = cacheKeyPrefix + regionCd;

      // 캐시에서 데이터를 가져오거나 새로 요청하여 캐시에 저장합니다
      const cachedData = cache.get<IApartmentData[]>(cacheKey);
      if (cachedData !== undefined) {
        // console.log(`지역 코드 ${regionCd}에 대한 아파트 데이터 캐시 히트`);
        return Promise.resolve(cachedData); // 캐시된 데이터가 있으면 즉시 반환합니다
      }

      // 캐시에 없는 경우 실제 데이터를 요청합니다
      return axios
        .get(apartmentUrl)
        .then((response) => {
          const apartmentData = response.data;
          // 데이터를 캐시에 저장합니다
          cache.set(cacheKey, apartmentData);
          return apartmentData;
        })
        .catch((error) => {
          console.error(
            `지역 코드 ${regionCd}에 대한 데이터를 가져오는 중 에러 발생:`,
            error
          );
          throw error; // 에러를 상위로 전파합니다
        });
    });

    const results = await Promise.all(apartmentDataPromises);
    return results; // 최종 결과를 IApartmentData[] 타입으로 반환
  } catch (error) {
    console.error(`지역 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
