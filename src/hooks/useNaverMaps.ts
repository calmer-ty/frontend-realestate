import { useEffect } from "react";
import type { IUseSelectMarkerMapsProps } from "../types";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

const loadScript = (src: string, onload: () => void): void => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = true;
  script.onload = onload;
  document.head.appendChild(script);
};

export const useNaverMaps = (props: IUseSelectMarkerMapsProps): void => {
  const { mapId, ncpClientId, onMapReady } = props;

  useEffect(() => {
    if (ncpClientId === undefined) {
      console.error("NCP Client ID가 설정되지 않았습니다.");
      return;
    }

    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";

    const initMap = async (): Promise<void> => {
      if (window.naver === undefined) {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }
      const initialLocation = new window.naver.maps.LatLng(37.3595704, 127.105399);
      const mapOptions = {
        center: initialLocation,
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
      };
      const map = new window.naver.maps.Map(mapId, mapOptions);
      onMapReady(map);
    };
    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [mapId, ncpClientId, onMapReady]);
};
