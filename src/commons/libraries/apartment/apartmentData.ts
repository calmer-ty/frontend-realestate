import { getRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import { logToFile } from "../utils/logToFile";

import type { IApartmentItem } from "../../types";

import pLimit from "p-limit";
const limit = pLimit(50);

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
    const seenRegionCodes = new Set<string>(); // 이미 처리한 regionCode를 기록할 Set

    const promises = regionCodes.map((regionCode) => {
      // regionCode가 이미 처리된 경우 해당 요청은 건너뛰기
      if (seenRegionCodes.has(regionCode)) {
        console.log(`Region code ${regionCode} already processed, skipping.`);
        return Promise.resolve([]); // 이미 처리된 경우 빈 배열을 반환
      }
      seenRegionCodes.add(regionCode); // regionCode를 Set에 추가하여 추적
      return limit(() => fetchApartmentData(regionCode));
    });
    // 모든 요청을 병렬로 실행하고 결과를 반환
    const apartmentData = await Promise.all(promises);
    logToFile(apartmentData.flat());
    return apartmentData.flat();
  } catch (error) {
    handleError(error, "getApartmentData"); // 에러 처리
    return [];
  }
};
