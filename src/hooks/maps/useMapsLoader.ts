import { useEffect } from "react";
import { getMapInitOptions, loadScript } from "@/src/commons/libraries/utils/naverMaps";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

interface IUseMapsLoaderProps {
  mapId: string;
  onMapLoaded: (map: any) => void;
}

export const useMapsLoader = ({ mapId, onMapLoaded }: IUseMapsLoaderProps): void => {
  const ncpClientId = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;

  useEffect(() => {
    if (ncpClientId === undefined) {
      console.error("NCP Client ID가 정의되지 않았습니다.");
      return;
    }

    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    const mapContainer = document.getElementById(mapId);

    console.log(window.naver);
    console.log(mapContainer);
    const handleScriptLoad = (): void => {
      if (window.naver === undefined) {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      if (mapContainer === null) {
        console.error(`ID가 ${mapId}인 mapContainer가 정의되지 않았습니다.`);
        return;
      }

      try {
        const map = new window.naver.maps.Map(mapId, getMapInitOptions());
        onMapLoaded(map);
      } catch (error) {
        console.error("네이버 지도를 초기화하는 데 실패했습니다:", error);
      }
    };

    // Check if the script is already loaded
    const existingScript = document.querySelector(`script[src="${NAVER_MAP_SCRIPT_URL}"]`);
    if (existingScript !== null) {
      handleScriptLoad(); // Directly call the callback if script is already loaded
    } else {
      loadScript(NAVER_MAP_SCRIPT_URL, handleScriptLoad);
    }

    return () => {
      // Clean up: Remove the script from the document head
      const existingScript = document.querySelector(`script[src="${NAVER_MAP_SCRIPT_URL}"]`);
      if (existingScript !== null) {
        document.head.removeChild(existingScript);
      }
    };
  }, [mapId, ncpClientId, onMapLoaded]);
};
