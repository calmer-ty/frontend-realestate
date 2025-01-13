import NodeCache from "node-cache";

// TTL을 7200초(2시간)로 설정하여 캐시 인스턴스를 초기화합니다.
const regionCache = new NodeCache({ stdTTL: 3600 });

// 임시타입
export const getCachedRegionData = (key: string): Array<{ locationName: string; regionCode: string }> | undefined => {
  return regionCache.get<Array<{ locationName: string; regionCode: string }>>(key);
};

export const setRegionCache = (key: string, data: Array<{ locationName: string; regionCode: string }>): void => {
  regionCache.set(key, data);
};
