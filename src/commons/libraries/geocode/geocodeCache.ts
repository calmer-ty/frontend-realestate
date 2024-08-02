import NodeCache from "node-cache";
import type { IGeocodeData } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const geocodeCache = new NodeCache({ stdTTL: 7200 });

export const getCachedGeocodeData = (key: string): IGeocodeData | undefined => {
  try {
    return geocodeCache.get<IGeocodeData>(key);
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return undefined;
  }
};

export const setGeocodeCache = (key: string, data: IGeocodeData): void => {
  try {
    geocodeCache.set(key, data);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};
