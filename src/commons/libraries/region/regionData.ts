import { regionApi } from "./regionApi";
import { cityArray } from "../utils/cityArray";
import { getCachedRegionData, setRegionCache } from "./regionCache";
import { regionCodeConstants } from "@/src/commons/constants/regionCode";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import pLimit from "p-limit";
const limit = pLimit(50);

// 특정 도시의 지역 데이터를 가져오는 함수
const fetchRegionData = async (city: string): Promise<string[]> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`${city}에 대한 캐시가 존재합니다:`, cachedData);
    return cachedData;
  }

  // regionCodeConstants에서 데이터를 확인합니다.
  if (regionCodeConstants[city] !== undefined) {
    // regionCodeConstants에 데이터가 있다면 캐시로 저장하고 반환합니다.
    setRegionCache(cacheKey, regionCodeConstants[city]);
    return regionCodeConstants[city];
  }

  console.log(`${city}에 대한 캐시가 존재하지 않으므로 API를 호출합니다.`); // 캐시가 없을 때 API 호출 여부

  try {
    const response = await regionApi(city);
    setRegionCache(cacheKey, response);

    return response;
  } catch (error) {
    handleError(error, `fetchRegionData - ${city}`); // 에러 처리
    return [];
  }
};

export const getRegionData = async (): Promise<string[]> => {
  try {
    const promise = cityArray.map((city) => limit(() => fetchRegionData(city))); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promise); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    return regionDatas.flat();
  } catch (error) {
    handleError(error, "fetchRegionData"); // 에러 처리
    return [];
  }
};
