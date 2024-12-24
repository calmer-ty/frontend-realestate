import { useEffect } from "react";
import { getMapInitOptions, loadScript } from "@/src/commons/libraries/utils/maps/init";

export interface IUseMapsLoaderProps {
  onMapLoaded: (map: any) => void;
}

const loadScriptAsync = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    loadScript(url, () => {
      resolve();
    });
  });
};

export const useMapsLoader = ({ onMapLoaded }: IUseMapsLoaderProps): void => {
  const ncpClientId = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;

  useEffect(() => {
    if (ncpClientId === undefined) {
      console.error("NCP Client ID가 정의되지 않았습니다.");
      return;
    }

    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;

    const handleScriptLoad = (): void => {
      if (window.naver === undefined) {
        console.error("네이버 맵 라이브러리가 로드되지 않았습니다.");
        return;
      }

      // 지도 컨테이너가 존재하는지 확인하는 콘솔 로그 추가
      const mapContainer = document.getElementById("map");
      if (mapContainer == null) {
        console.error("지도 컨테이너가 렌더링되지 않았습니다.");
        return;
      }

      try {
        const map = new window.naver.maps.Map("map", getMapInitOptions());
        onMapLoaded(map);
      } catch (error) {
        console.error("네이버 지도를 초기화하는 데 실패했습니다:", error);
      }
    };

    const initMap = async (): Promise<void> => {
      try {
        // 스크립트 로드가 완료될 때까지 기다림
        await loadScriptAsync(NAVER_MAP_SCRIPT_URL);
        handleScriptLoad();
      } catch (error) {
        console.error("스크립트 로드 실패:", error);
      }
    };

    void initMap(); // 지도 로딩 시작
  }, [onMapLoaded, ncpClientId]);
};
