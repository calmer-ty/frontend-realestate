import { useEffect, useState } from "react";
import { getMapInitialOptions, loadScript } from "@/src/commons/libraries/utils/naverMaps";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

export const useNaverMaps = (mapContainerId: string, onMapLoaded: (map: any) => void): void => {
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  useEffect(() => {
    if (ncpClientId === undefined) return;

    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;

    const initMap = async (): Promise<void> => {
      if (typeof window.naver === "undefined") {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      const map = new window.naver.maps.Map(mapContainerId, getMapInitialOptions());
      onMapLoaded(map);
    };

    loadScript(NAVER_MAP_SCRIPT_URL, initMap);
  }, [ncpClientId, mapContainerId, onMapLoaded]);
};
