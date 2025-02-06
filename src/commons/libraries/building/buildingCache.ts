import NodeCache from "node-cache";
import type { IBuildingItem } from "@/src/commons/types";

// TTL을 7200초(1시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const officetelCache = new NodeCache({ stdTTL: 3600 });

export const getCachedBuildingData = (key: string): IBuildingItem[] | undefined => {
  try {
    return officetelCache.get<IBuildingItem[]>(key);
  } catch (error) {
    console.error(`Error getting cache for key ${key}:`, error);
    return [];
  }
};

// 모든 캐시 키를 가져오는 함수
export const getAllCacheBuildingKeys = (): string[] => {
  return officetelCache.keys(); // NodeCache의 keys 메서드로 키 목록을 가져옴
};

export const setBuildingCache = (key: string, data: IBuildingItem[]): void => {
  try {
    officetelCache.set(key, data);
  } catch (error) {
    console.error(`Error setting cache for key ${key}:`, error);
  }
};
