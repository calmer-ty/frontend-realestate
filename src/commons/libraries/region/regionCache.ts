import NodeCache from "node-cache";
import type { IRegionData } from "@/src/types";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const regionCache = new NodeCache({ stdTTL: 7200 });

export const getCachedRegionData = (key: string): IRegionData | undefined => {
  return regionCache.get<IRegionData>(key);
};

export const setRegionCache = (key: string, data: IRegionData): void => {
  regionCache.set(key, data);
};
