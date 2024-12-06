import { getAllRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import type { IApartmentLocation } from "@/src/commons/types";

import pLimit from "p-limit";
const limit = pLimit(10); // 동시 실행 제한: 최대 5개의 요청

export const getApartmentData = async (): Promise<IApartmentLocation[]> => {
  try {
    const regionCodes: string[] = await getAllRegionData();

    const promises = regionCodes.map((regionCode) =>
      limit(async () => {
        const cacheKey = `apartment_${regionCode}`;
        const cachedData = getCachedApartmentData(cacheKey);

        if (cachedData !== undefined) {
          return cachedData; // 캐시 히트 시 바로 반환
        }

        try {
          const responses = await apartmentApi(regionCode);
          console.log("[response apartmentApi] ", responses);
          const apartmentLocationData: IApartmentLocation = { responses };
          setApartmentCache(cacheKey, apartmentLocationData); // 캐시에 저장
          return apartmentLocationData;
        } catch (error) {
          console.error(`Error fetching data for regionCode ${regionCode}:`, error);
          return null; // 에러 발생 시 null 반환
        }
      })
    );

    // 모든 지역에 대한 데이터를 비동기적으로 가져와서 반환합니다
    // const apartmentDataList: IApartmentLocation[] = await Promise.all(promises);
    // return apartmentDataList;

    // 모든 요청 처리 결과를 기다립니다
    const apartmentDataList = (await Promise.all(promises)).filter(
      (data) => data !== null // null 값은 제외
    );
    return apartmentDataList;
  } catch (error) {
    console.error(`아파트 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
