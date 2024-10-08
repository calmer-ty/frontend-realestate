import NodeCache from "node-cache";
import type { IApartmentLocation } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const apartmentCache = new NodeCache({ stdTTL: 7200 });

export const getCachedApartmentData = (key: string): IApartmentLocation | undefined => {
  return apartmentCache.get<IApartmentLocation>(key);
};

export const setApartmentCache = (key: string, data: IApartmentLocation): void => {
  apartmentCache.set(key, data);
};
