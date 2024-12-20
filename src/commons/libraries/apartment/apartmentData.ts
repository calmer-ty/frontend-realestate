import { getRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

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
    handleError(error, `fetchApartmentData - ${regionCode}`); // 에러 처리
    return [];
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
    handleError(error, "getApartmentData"); // 에러 처리
    return [];
  }
};
