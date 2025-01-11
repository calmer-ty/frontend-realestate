import { useRef, useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { loadScript } from "@/src/commons/libraries/utils/maps/init";
import { createMarker } from "@/src/commons/libraries/utils/maps/marker";
import { clusteringOptions } from "@/src/commons/libraries/utils/maps/cluster";

import type { Dispatch, SetStateAction } from "react";
import type { IGeocodeData, IFirestore } from "@/src/commons/types";

interface IUseAllMarkerProps {
  geocodeData?: IGeocodeData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  setVisibleMarkerData: Dispatch<SetStateAction<IGeocodeData[]>>;
  firestoreData: IFirestore[];
}

export const useAllMarker = ({ geocodeData, firestoreData, setSelectedMarkerData, setVisibleMarkerData }: IUseAllMarkerProps): void => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();
  const isClusterScriptLoadedRef = useRef(false);

  const updateMarkers = useCallback(
    async (map: any) => {
      // console.log("Current geocodeData:", geocodeData); // 여기서 geocodeData 상태를 확인
      const mapBounds = map.getBounds();
      const processedPositions = new Set<string>();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeData?.forEach((itemData) => {
        const position = new window.naver.maps.LatLng(itemData.geocode?.latitude, itemData.geocode?.longitude);
        const positionKey = `${itemData.geocode?.latitude},${itemData.geocode?.longitude}`;

        if (mapBounds.hasLatLng(position) === true && !processedPositions.has(positionKey)) {
          const marker = createMarker(itemData, firestoreData, setSelectedMarkerData);
          markersRef.current.push(marker);
          processedPositions.add(positionKey); // 이미 처리한 위치는 Set에 추가
        }
      });

      if (markerClusteringRef.current != null) {
        markerClusteringRef.current.setMap(null);
      }
      markerClusteringRef.current = clusteringOptions(map, markersRef.current);

      const markerDataArray: IGeocodeData[] = markersRef.current.map((marker) => marker.get("data"));

      setVisibleMarkerData(markerDataArray);
      setSelectedMarkerData(null);
    },
    [geocodeData, firestoreData, setVisibleMarkerData, setSelectedMarkerData]
  );

  const loadClusterScript = useCallback(
    (map: any) => {
      if (isClusterScriptLoadedRef.current) {
        console.log("클러스터 스크립트가 이미 로드되었습니다.");

        // 기존 리스너 제거 후 등록
        window.naver.maps.Event.clearListeners(map, "idle");
        window.naver.maps.Event.addListener(map, "idle", () => {
          void updateMarkers(map);
        });
        void updateMarkers(map);
        return;
      }

      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        try {
          console.log("클러스터를 실행합니다.");
          isClusterScriptLoadedRef.current = true; // 스크립트가 로드되었음을 기록

          window.naver.maps.Event.addListener(map, "idle", () => {
            void updateMarkers(map);
          });
          void updateMarkers(map);
        } catch (error) {
          console.error("클러스터 스크립트 로드 중 오류 발생:", error);
        }
      });
    },
    [updateMarkers]
  );

  // prettier-ignore
  const onMapLoaded = useCallback((map: any) => { loadClusterScript(map) },[loadClusterScript]);
  useMapsLoader({ onMapLoaded });
};
