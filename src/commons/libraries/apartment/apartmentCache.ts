import NodeCache from "node-cache";
import type { IApartmentItem } from "@/src/commons/types";

// TTL을 7200초(1시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const apartmentCache = new NodeCache({ stdTTL: 3600 });

export const getCachedApartmentData = (key: string): IApartmentItem[] | undefined => {
  const cachedData = apartmentCache.get<IApartmentItem[]>(key);
  return cachedData;
};

// 모든 캐시 키를 가져오는 함수
export const getAllCacheApartmentKeys = (): string[] => {
  return apartmentCache.keys(); // NodeCache의 keys 메서드로 키 목록을 가져옴
};

export const setApartmentCache = (key: string, data: IApartmentItem[]): void => {
  apartmentCache.set(key, data);
};
