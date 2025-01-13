import { regionApi } from "./regionApi";
import { cityArray } from "../utils/cityArray";
import { getCachedRegionData, setRegionCache } from "./regionCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

// import { regionCodeConstants } from "@/src/commons/constants/regionCode";

import pLimit from "p-limit";
import { logToFile } from "../utils/logToFile";
const limit = pLimit(10);

// 특정 도시의 지역 데이터를 가져오는 함수
const fetchRegionData = async (city: string): Promise<Array<{ locationName: string; regionCode: string }>> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`${city}에 대한 캐시가 존재합니다:`, cachedData);
    return cachedData;
  }

  // // regionCodeConstants에서 데이터를 확인합니다.
  // if (regionCodeConstants[city] !== undefined) {
  //   // regionCodeConstants에 데이터가 있다면 캐시로 저장하고 반환합니다.
  //   setRegionCache(cacheKey, regionCodeConstants[city]);
  //   return regionCodeConstants[city];
  // }

  try {
    const response = await regionApi(city);
    setRegionCache(cacheKey, response);

    return response;
  } catch (error) {
    handleError(error, `fetchRegionData - ${city}`); // 에러 처리
    return [];
  }
};

// 지역 데이터를 가져오는 함수
export const getRegionData = async (): Promise<Array<{ locationNames: string[]; regionCodes: string[] }>> => {
  try {
    const promise = cityArray.map((city) => limit(() => fetchRegionData(city))); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promise); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    // 지역 코드와 위치 이름을 그룹화하여 배열로 반환
    const regionDataList = regionDatas.map((regionData) => {
      const locationNames = regionData.map((item) => item.locationName);
      const regionCodes = regionData.map((item) => item.regionCode);

      return { locationNames, regionCodes };
    });

    logToFile("getRegionData: ", regionDatas.flat());
    return regionDataList.flat(); // 도시별 지역 코드 그룹화된 객체 반환
  } catch (error) {
    handleError(error, "fetchRegionData"); // 에러 처리
    return [];
  }
};
