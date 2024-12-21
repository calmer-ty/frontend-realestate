import { getRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IApartmentItem } from "@/src/commons/types";

// import pLimit from "p-limit";
// const limit = pLimit(50);

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
    handleError(error, `fetchApartmentData - ${regionCode}`); // 에러 처리
    return [];
  }
};

export const getApartmentData = async (): Promise<IApartmentItem[]> => {
  try {
    const regionCodes: string[] = await getRegionData();

    // regionCode마다 fetchApartmentData를 호출
    const promises = regionCodes.map(async (regionCode) => {
      const data = await fetchApartmentData(regionCode);
      return data;
    });

    const apartmentData = await Promise.all(promises);

    // logToFile(`최종 필터링된 result: ${JSON.stringify(apartmentData.flat())}`); // 최종 필터링된 결과를 로그로 기록
    // 모든 요청을 병렬로 실행하고 결과를 반환
    return apartmentData.flat();
  } catch (error) {
    handleError(error, "getApartmentData"); // 에러 처리
    return [];
  }
};
