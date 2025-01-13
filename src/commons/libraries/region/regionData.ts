import { regionApi } from "./regionApi";
import { CITIES } from "@/src/commons/constants/regionData";
import { getCachedRegionData, setRegionCache } from "./regionCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

// import { regionCodeConstants } from "@/src/commons/constants/regionCode";

// import { logToFile } from "../utils/logToFile";
import pLimit from "p-limit";
const limit = pLimit(10);

// 특정 도시의 지역 데이터를 가져오는 함수
const fetchRegionData = async (city: string): Promise<Array<{ locataddNm: string; locallowNm: string; regionCode: string }>> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`${city}에 대한 캐시가 존재합니다:`, cachedData);
    return cachedData;
  }

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
export const getRegionData = async (): Promise<Array<{ locataddNm: string[]; locallowNm: string[]; regionCode: string[] }>> => {
  try {
    const promise = CITIES.map((city) => limit(() => fetchRegionData(city))); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promise); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    // 지역 코드와 위치 이름을 그룹화하여 배열로 반환
    const regionDataList = regionDatas.map((regionData) => {
      const locataddNm = regionData.map((item) => item.locataddNm);
      const locallowNm = regionData.map((item) => item.locallowNm);
      const regionCode = regionData.map((item) => item.regionCode);

      // console.log("locataddNm:", locataddNm); // locataddNm 확인

      return { locataddNm, locallowNm, regionCode };
    });

    // logToFile("getRegionData: ", regionDatas.flat());
    return regionDataList.flat(); // 도시별 지역 코드 그룹화된 객체 반환
  } catch (error) {
    handleError(error, "fetchRegionData"); // 에러 처리
    return [];
  }
};
