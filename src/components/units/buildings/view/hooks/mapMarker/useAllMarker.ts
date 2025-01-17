import { useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { useClusterScriptLoader } from "./useClusterScriptLoader";
import { useMarkers } from "./useMarkers";

import type { IMapMarkerParams } from "@/src/commons/types";
interface IUseAllMarkerReturn {
  mapLoading: boolean;
  mapError: boolean;
}

export const useAllMarker = ({ geocode, geocodeDatas, firestoreData, setSelectedMarkerData, setVisibleMarkerData }: IMapMarkerParams): IUseAllMarkerReturn => {
  const { updateMarkers } = useMarkers({ geocodeDatas, firestoreData, setVisibleMarkerData, setSelectedMarkerData });
  const { loadClusterScript } = useClusterScriptLoader(updateMarkers);

  const onMapLoaded = useCallback(
    (map: any) => {
      // 첫 번째 geocodeDatas를 중심 좌표로 설정
      if (geocode !== undefined) {
        const firstPosition = new window.naver.maps.LatLng(geocode.latitude, geocode.longitude);
        map.setCenter(firstPosition); // 지도 중심 설정
      }

      loadClusterScript(map); // 클러스터 스크립트 로드
    },
    [geocode, loadClusterScript]
  );

  const { mapLoading, mapError } = useMapsLoader({ onMapLoaded });
  return {
    mapLoading,
    mapError,
  };
};
