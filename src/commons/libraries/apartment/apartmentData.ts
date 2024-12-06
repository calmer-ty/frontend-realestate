import { getRegionData } from "../region/regionData";
import { apartmentApi } from "./apartmentApi";
import { getCachedApartmentData, setApartmentCache } from "./apartmentCache";
import type { IApartmentItem } from "../../types";

import pLimit from "p-limit";
const limit = pLimit(30);

export const fetchApartmentData = async (regionCode: string): Promise<IApartmentItem[]> => {
  try {
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
      throw new Error(`${regionCode}의 지역 데이터를 가져오는 데 실패했습니다`);
    }
  } catch (error) {
    console.error(`아파트 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};

export const getApartmentData = async (): Promise<IApartmentItem[]> => {
  try {
    const regionCodes: string[] = await getRegionData();

    const promises = regionCodes.map((regionCode) => limit(() => fetchApartmentData(regionCode)));

    // 모든 요청을 병렬로 실행하고 결과를 반환
    const apartmentDataList = await Promise.all(promises);
    console.log("apartmentDataList.flat() ", apartmentDataList.flat());
    return apartmentDataList.flat();
  } catch (error) {
    console.error(`아파트 데이터를 가져오는 중 에러 발생:`, error);
    throw error;
  }
};
