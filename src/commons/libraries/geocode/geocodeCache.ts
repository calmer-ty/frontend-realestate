import NodeCache from "node-cache";
import type { IGeocodeData } from "@/src/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const geocodeCache = new NodeCache({ stdTTL: 7200 });

export const getCachedGeocodeData = (key: string): IGeocodeData | undefined => {
  return geocodeCache.get<IGeocodeData>(key);
};

export const setGeocodeCache = (key: string, data: IGeocodeData): void => {
  geocodeCache.set(key, data);
};
