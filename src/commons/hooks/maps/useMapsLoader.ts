import { useCallback, useEffect, useState } from "react";
import { getMapInitOptions, loadScript } from "@/src/commons/libraries/utils/maps/init";

interface IUseMapsLoaderParams {
  onMapLoaded: (map: any) => void;
}
interface IUseMapsLoaderReturn {
  mapLoading: boolean;
  mapError: boolean;
}

const loadScriptAsync = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    loadScript(url, () => {
      resolve();
    });
  });
};

export const useMapsLoader = ({ onMapLoaded }: IUseMapsLoaderParams): IUseMapsLoaderReturn => {
  const ncpClientId = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;
  const [mapLoading, setMapLoading] = useState(true); // 로딩 상태 추가
  const [mapError, setMapError] = useState(false); // 에러 상태 추가

  const handleScriptLoad = useCallback((): void => {
    if (window.naver === undefined) {
      console.warn("네이버 맵 라이브러리가 로드되지 않았습니다.");
      setMapError(true);
      setMapLoading(false);
      return;
    }

    // 지도 컨테이너가 존재하는지 확인하는 콘솔 로그 추가
    const mapContainer = document.getElementById("map");
    if (mapContainer == null) {
      console.warn("지도 컨테이너가 렌더링되지 않았습니다.");
      setMapError(true);
      setMapLoading(false);
      return;
    }

    try {
      const map = new window.naver.maps.Map("map", getMapInitOptions());
      onMapLoaded(map);
      setMapLoading(false); // 지도 로딩 완료
    } catch (error) {
      console.error("네이버 지도를 초기화하는 데 실패했습니다:", error);
      setMapError(true);
      setMapLoading(false);
    }
  }, [onMapLoaded]);

  const initMap = useCallback(async (): Promise<void> => {
    if (ncpClientId === undefined) {
      console.error("NCP Client ID가 정의되지 않았습니다.");
      setMapError(true);
      setMapLoading(false);
      return;
    }

    const NAVER_MAP_SCRIPT_URL = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${ncpClientId}`;

    try {
      // 스크립트 로드가 완료될 때까지 기다림
      await loadScriptAsync(NAVER_MAP_SCRIPT_URL);
      handleScriptLoad();
    } catch (error) {
      console.error("스크립트 로드 실패:", error);
    }
  }, [ncpClientId, handleScriptLoad]);

  useEffect(() => {
    void initMap(); // 지도 로딩 시작
  }, [initMap]);

  return { mapLoading, mapError };
};
