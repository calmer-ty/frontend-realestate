import { geocodeApi } from "./geocodeApi";
import { getCachedGeocodeData, setGeocodeCache } from "./geocodeCache";
import { handleError } from "@/src/commons/libraries/utils/handleError";

import type { IGeocode } from "@/src/commons/types";

export const getSelectGeocodeData = async (address: string): Promise<IGeocode | undefined> => {
  const cacheKey = `geocode_${address}`;
  const cachedData = getCachedGeocodeData(cacheKey);

  if (cachedData !== undefined) {
    return cachedData;
  }

  try {
    const response = await geocodeApi(address);
    if (response === undefined) {
      return undefined;
    }
    setGeocodeCache(cacheKey, response);
    return response;
  } catch (error) {
    handleError(error, `getGeocodeByRegionName - ${address}`);
    return undefined;
  }
};
