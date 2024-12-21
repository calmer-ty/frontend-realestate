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
      console.log("updateMarkers called");
      console.log("Current geocodeData:", geocodeData); // 여기서 geocodeData 상태를 확인

      const mapBounds = map.getBounds();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeData?.forEach((item) => {
        const position = new window.naver.maps.LatLng(item.geocode?.latitude, item.geocode?.longitude);

        if (mapBounds.hasLatLng(position) === true) {
          const existingMarker = markersRef.current.find((marker) => marker.getPosition().equals(position));
          if (existingMarker === undefined) {
            const marker = createMarker(item, firestoreData, setSelectedMarkerData);
            markersRef.current.push(marker);
          }
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
        window.naver.maps.Event.addListener(map, "idle", () => {
          void updateMarkers(map);
        });
        void updateMarkers(map);
        return;
      }

      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        console.log("클러스터를 실행합니다.");
        isClusterScriptLoadedRef.current = true; // 스크립트가 로드되었음을 기록
        window.naver.maps.Event.addListener(map, "idle", () => {
          void updateMarkers(map);
        });
        void updateMarkers(map);
      });
    },
    [updateMarkers]
  );

  const onMapLoaded = useCallback(
    (map: any) => {
      loadClusterScript(map);
    },
    [loadClusterScript]
  );
  useMapsLoader({ onMapLoaded });
};
