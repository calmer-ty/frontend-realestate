import { useEffect, useState } from "react";
import { getMapInitialOptions, loadScript } from "@/src/commons/libraries/utils/naverMaps";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

interface UseNaverMapsReturn {
  map: any;
  createMarker: (latitude: number, longitude: number) => any;
}

export const useNaverMaps = (ncpClientId: string): UseNaverMapsReturn => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";

    const initMap = async (): Promise<void> => {
      if (window.naver === undefined) {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      const map = new window.naver.maps.Map("map", getMapInitialOptions());
      setMap(map);
    };
    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [ncpClientId]);

  const createMarker = (latitude: number, longitude: number): any => {
    if (map === undefined) return null;

    const markerPosition = new window.naver.maps.LatLng(latitude, longitude);
    const marker = new window.naver.maps.Marker({
      position: markerPosition,
      map,
    });
    return marker;
  };

  return { map, createMarker };
};
