import NodeCache from "node-cache";
import type { IApartmentItem } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const apartmentCache = new NodeCache({ stdTTL: 3600 });

export const getCachedApartmentData = (key: string): IApartmentItem[] | undefined => {
  return apartmentCache.get<IApartmentItem[]>(key);
};

export const setApartmentCache = (key: string, data: IApartmentItem[]): void => {
  apartmentCache.set(key, data);
};
