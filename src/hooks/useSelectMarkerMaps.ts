import { useEffect, useState } from "react";
import { getMapInitialOptions, loadScript } from "@/src//commons/libraries/utils/naverMaps";
import type { IGeocodeData } from "../types";

export const useSelectMarkerMaps = (props: IGeocodeData | null): void => {
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  useEffect(() => {
    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;

    const initMap = async (): Promise<void> => {
      if (typeof window.naver === "undefined") {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      // 마커를 담을 Map 생성
      const map = new window.naver.maps.Map("map", getMapInitialOptions());

      if (props !== null) {
        const markerPosition = new window.naver.maps.LatLng(props.latitude, props.longitude);

        // 마커를 변수에 저장하고 이를 활용
        const marker = new window.naver.maps.Marker({
          position: markerPosition,
          map,
        });
        marker.setMap(map);

        // 지도 중심을 마커 위치로 이동
        map.setCenter(markerPosition);
      }
    };
    loadScript(NAVER_MAP_SCRIPT_URL, initMap);
  }, [ncpClientId, props]);
};
