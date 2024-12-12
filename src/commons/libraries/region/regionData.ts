import { regionApi } from "./regionApi";
import { cityArray } from "../utils/cityArray";
import { getCachedRegionData, setRegionCache } from "./regionCache";

// 특정 도시의 지역 데이터를 가져오는 함수
const fetchRegionData = async (city: string): Promise<string[]> => {
  const cacheKey = `region_${city}`;
  const cachedData = getCachedRegionData(cacheKey);

  if (cachedData !== undefined) {
    // console.log(`지역 코드 ${result.region_cd}에 대한 아파트 데이터 캐시 히트`);
    return cachedData;
  }

  try {
    const response = await regionApi(city);
    setRegionCache(cacheKey, response);

    return response;
  } catch (error) {
    throw new Error(`${city}, 파라미터 값을 가져오는 데 실패했습니다`);
  }
};

export const getRegionData = async (): Promise<string[]> => {
  try {
    const promise = cityArray.map((city) => fetchRegionData(city)); // 각 도시에 대해 데이터를 가져오는 Promise 배열을 생성합니다
    const regionDatas = await Promise.all(promise); // Promise.all을 사용해 모든 데이터를 병렬로 가져옵니다

    return regionDatas.flat();
  } catch (error) {
    throw new Error("지역 Data 로딩 실패");
  }
};
