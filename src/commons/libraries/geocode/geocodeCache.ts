import NodeCache from "node-cache";
import type { IGeocode } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const geocodeCache = new NodeCache({ stdTTL: 3600 });

export const getCachedGeocodeData = (key: string): IGeocode | undefined => {
  try {
    return geocodeCache.get<IGeocode>(key);
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return undefined;
  }
};

export const setGeocodeCache = (key: string, data: IGeocode): void => {
  try {
    geocodeCache.set(key, data);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};
