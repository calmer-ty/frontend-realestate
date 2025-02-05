import { officetelApi } from "./officetelApi";
import { getCachedOfficetelData, setOfficetelCache } from "./officetelCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IOfficetelItem } from "@/src/commons/types";

export const getOfficetelData = async (regionCode: string): Promise<IOfficetelItem[]> => {
  if (regionCode === "") {
    console.warn("regionCode is undefined, skipping API call");
    return []; // regionCode가 없으면 빈 배열 반환
  }

  const cacheKey = `officetel_${regionCode}`;
  const cachedData = getCachedOfficetelData(cacheKey);

  if (cachedData !== undefined) {
    return cachedData; // 캐시가 있으면 캐시 데이터 반환
  }

  try {
    const response = await officetelApi(regionCode);
    setOfficetelCache(cacheKey, response);
    // console.log("API 데이터 캐시 저장 결과: ", response);

    return response;
  } catch (error) {
    handleError(error, `getOfficetelData - ${regionCode}`);
    return []; // 에러가 발생하면 빈 배열 반환
  }
};
