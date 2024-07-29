import { useEffect, useState } from "react";
import type { IGeocodeData } from "../types";

declare global {
  interface Window {
    naver: any;
  }
}

export const useSelectedMarkerMaps = (props: IGeocodeData | null): void => {
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);
  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);
  useEffect(() => {
    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;

    const loadScript = (src: string, onload: () => void): void => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = true;
      script.onload = onload;
      document.head.appendChild(script);
    };
    const initMap = async (): Promise<void> => {
      if (typeof window.naver === "undefined") {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      // 초기 위치 설정
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

      // 마커를 담을 Map 생성
      const map = new window.naver.maps.Map("map", mapOptions);

      // props가 있을 때만 마커와 지도의 중심을 설정합니다
      if (props !== null) {
        const markerOptions = {
          position: new window.naver.maps.LatLng(props.latitude, props.longitude),
          map,
        };

        // 마커를 변수에 저장하고 이를 활용
        const marker = new window.naver.maps.Marker(markerOptions);
        marker.setMap(map);

        // 마커 위치로 지도의 중심 이동
        map.setCenter(markerOptions.position);
      }
    };
    loadScript(NAVER_MAP_SCRIPT_URL, initMap);
  }, [ncpClientId, props]);
};
