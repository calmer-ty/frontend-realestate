import { getAllRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import type { IApartmentLocation } from "@/src/commons/types";

export const getApartmentData = async (): Promise<IApartmentLocation[]> => {
  try {
    const regionCodes: string[] = await getAllRegionData();

    const promises = regionCodes.map(async (regionCode) => {
      const cacheKey = `apartment_${regionCode}`;
      const cachedData = getCachedApartmentData(cacheKey);

      if (cachedData !== undefined) {
        // console.log(`지역 코드 ${result.region_cd}에 대한 아파트 데이터 캐시 히트`);
        return cachedData;
      }

      // 캐시에 없는 경우 실제 데이터를 요청합니다
      try {
        const responses = await apartmentApi(regionCode);
        console.log("[response apartmentApi] ", responses);
        const apartmentLocationData: IApartmentLocation = {
          responses,
        };
        setApartmentCache(cacheKey, apartmentLocationData);
        return apartmentLocationData;
      } catch (error) {
        console.error(`지역 코드 ${regionCode}에 대한 데이터를 가져오는 중 에러 발생:`, error);
        throw error; // 에러를 상위로 전파합니다
      }
    });

    // 모든 지역에 대한 데이터를 비동기적으로 가져와서 반환합니다
    const apartmentDataList: IApartmentLocation[] = await Promise.all(promises);

    return apartmentDataList;
  } catch (error) {
    console.error(`아파트 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
