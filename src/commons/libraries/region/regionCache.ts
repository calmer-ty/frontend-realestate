import NodeCache from "node-cache";
// import type { IRegion } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const regionCache = new NodeCache({ stdTTL: 7200 });

console.log("[regionCache] ", regionCache);

// 임시타입
export const getCachedRegionData = (key: string): any => {
  return regionCache.get<Record<string, string[]>>(key);
};

export const setRegionCache = (key: string, data: Record<string, string[]>): void => {
  regionCache.set(key, data);
};
