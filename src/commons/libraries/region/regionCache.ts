import NodeCache from "node-cache";
import type { IRegion } from "@/src/commons/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const regionCache = new NodeCache({ stdTTL: 7200 });

export const getCachedRegionData = (key: string): IRegion | undefined => {
  return regionCache.get<IRegion>(key);
};

export const setRegionCache = (key: string, data: IRegion): void => {
  regionCache.set(key, data);
};
