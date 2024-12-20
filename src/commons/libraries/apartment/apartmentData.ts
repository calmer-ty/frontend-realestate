import { getRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import type { IApartmentItem } from "../../types";

// import pLimit from "p-limit";
// const limit = pLimit(30);

export const fetchApartmentData = async (regionCode: string): Promise<IApartmentItem[]> => {
  const cacheKey = `apartment_${regionCode}`;
  const cachedData = getCachedApartmentData(cacheKey);

  if (cachedData !== undefined) {
    return cachedData; // 캐시 히트 시 바로 반환
  }

  try {
    const responses = await apartmentApi(regionCode);
    setApartmentCache(cacheKey, responses); // 캐시에 저장
    return responses;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`fetchApartmentData 에러 발생 - ${regionCode}:`, error.message);
      throw new Error(`아파트 데이터를 가져오는 데 실패했습니다. (RegionCode: ${regionCode})`);
    } else {
      console.error("예상치 못한 에러:", error);
      throw new Error("알 수 없는 오류 발생");
    }
  }
};

export const getApartmentData = async (): Promise<IApartmentItem[]> => {
  try {
    const regionCodes: string[] = await getRegionData();

    // const promises = regionCodes.map((regionCode) => limit(() => fetchApartmentData(regionCode)));
    const promises = regionCodes.map((regionCode) => fetchApartmentData(regionCode));
    // 모든 요청을 병렬로 실행하고 결과를 반환
    const apartmentData = await Promise.all(promises);
    return apartmentData.flat();
  } catch (error) {
    if (error instanceof Error) {
      console.error("getApartmentData 에러 발생:", error.message);
      throw new Error(`아파트 데이터를 가져오는 데 실패했습니다. (전체 지역 코드에서 오류 발생)`);
    } else {
      console.error("예상치 못한 에러:", error);
      throw new Error("알 수 없는 오류 발생");
    }
  }
};
