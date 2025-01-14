import { useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { useClusterScriptLoader } from "./useClusterScriptLoader";
import { useMarkers } from "./useMarkers";

import type { IMapMarkerProps } from "@/src/commons/types";

export const useAllMarker = ({ geocodeData, firestoreData, setSelectedMarkerData, setVisibleMarkerData }: IMapMarkerProps): void => {
  const { updateMarkers } = useMarkers({ geocodeData, firestoreData, setVisibleMarkerData, setSelectedMarkerData });
  const { loadClusterScript } = useClusterScriptLoader(updateMarkers);

  const onMapLoaded = useCallback(
    (map: any) => {
      // 첫 번째 geocodeData를 중심 좌표로 설정
      if (geocodeData !== undefined && geocodeData.length > 0) {
        const firstPosition = new window.naver.maps.LatLng(geocodeData[0].geocode?.latitude, geocodeData[0].geocode?.longitude);
        map.setCenter(firstPosition); // 지도 중심 설정
      }
      loadClusterScript(map); // 클러스터 스크립트 로드
    },
    [loadClusterScript, geocodeData]
  );

  // prettier-ignore
  // const onMapLoaded = useCallback((map: any) => { loadClusterScript(map) },[loadClusterScript]);
  useMapsLoader({ onMapLoaded });
};
