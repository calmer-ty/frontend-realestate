import { buildingApi } from "./buildingApi";
import { getCachedBuildingData, setBuildingCache } from "./buildingCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IBuildingDataParams, IBuildingItem } from "@/src/commons/types";

export const getBuildingData = async ({ regionCode, regionName, buildingType }: IBuildingDataParams): Promise<IBuildingItem[]> => {
  const cacheKey = `${buildingType}_${regionCode}`;
  const cachedData = getCachedBuildingData(cacheKey);

  if (cachedData !== undefined) {
    return cachedData; // 캐시가 있으면 캐시 데이터 반환
  }

  try {
    const response = await buildingApi({ regionCode, regionName, buildingType });
    setBuildingCache(cacheKey, response);
    // console.log("API 데이터 캐시 저장 결과: ", response);

    return response;
  } catch (error) {
    handleError(error, "getBuildingData");
    return []; // 에러가 발생하면 빈 배열 반환
  }
};
