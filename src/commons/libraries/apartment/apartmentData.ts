import { regionAllData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import type { IApartmentLocation } from "@/src/commons/types";

export const apartmentData = async (): Promise<IApartmentLocation[]> => {
  try {
    // 지역 데이터를 가져옵니다
    const regionResults = await regionAllData();

    const apartmentDataPromises = regionResults.map(async (result) => {
      const cacheKey = `apartment_${result.region_cd}`;

      const cachedData = getCachedApartmentData(cacheKey);
      if (cachedData !== undefined) {
        // console.log(`지역 코드 ${result.region_cd}에 대한 아파트 데이터 캐시 히트`);
        return cachedData;
      }

      // 캐시에 없는 경우 실제 데이터를 요청합니다
      try {
        const response = await apartmentApi(result);
        const datas = response;

        const apartmentLocationData: IApartmentLocation = {
          datas,
          locatadd_nm: result.locatadd_nm ?? "값 없음",
        };

        // 데이터를 캐시에 저장합니다
        setApartmentCache(cacheKey, apartmentLocationData);
        return apartmentLocationData;
      } catch (error) {
        console.error(`지역 코드 ${result.locatadd_nm}에 대한 데이터를 가져오는 중 에러 발생:`, error);
        throw error; // 에러를 상위로 전파합니다
      }
    });

    // 모든 지역에 대한 데이터를 비동기적으로 가져와서 반환합니다
    const dataPromises: IApartmentLocation[] = await Promise.all(apartmentDataPromises);

    return dataPromises;
  } catch (error) {
    console.error(`아파트 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
