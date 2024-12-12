import { useRef, useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { markerIconContent } from "@/src/commons/libraries/utils/maps/marker";
import { createMarkerClusteringOptions } from "@/src/commons/libraries/utils/maps/cluster";
import { loadScript } from "@/src/commons/libraries/utils/maps/init";

import type { Dispatch, SetStateAction } from "react";
import type { IGeocodeData, IFirestore, IApartmentItem } from "@/src/commons/types";

interface IUseAllMarkerProps {
  geocodeData?: IGeocodeData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IApartmentItem | null>>;
  setVisibleMarkerData: Dispatch<SetStateAction<IApartmentItem[]>>;
  firestoreData: IFirestore[];
}

export const useAllMarker = ({ geocodeData, firestoreData, setSelectedMarkerData, setVisibleMarkerData }: IUseAllMarkerProps): void => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();
  const isClusterScriptLoadedRef = useRef(false);

  const createMarker = useCallback(
    (geocodeData: IGeocodeData) => {
      const { data, geocode } = geocodeData;

      if (data === undefined) return;
      const markerOptions = {
        position: new window.naver.maps.LatLng(geocode?.latitude, geocode?.longitude),
        map: null, // Set map to null initially
        icon: {
          content: markerIconContent(data, firestoreData),
        },
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      marker.set("data", data);

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (geocodeData.data !== undefined) {
          setSelectedMarkerData(geocodeData.data);
        }
      });

      return marker;
    },
    [firestoreData, setSelectedMarkerData]
  );

  const updateMarkers = useCallback(
    async (map: any) => {
      const mapBounds = map.getBounds();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeData?.forEach((item) => {
        const { geocode } = item;
        const position = new window.naver.maps.LatLng(geocode?.latitude, geocode?.longitude);

        if (mapBounds.hasLatLng(position) === true) {
          const existingMarker = markersRef.current.find((marker) => marker.getPosition().equals(position));
          if (existingMarker === undefined) {
            const marker = createMarker(item);
            markersRef.current.push(marker);
          }
        }
      });

      if (markerClusteringRef.current != null) {
        markerClusteringRef.current.setMap(null);
      }
      markerClusteringRef.current = createMarkerClusteringOptions(map, markersRef.current);

      const markerDataArray = markersRef.current.map((marker) => marker.get("data"));
      console.log("markerDataArray ", markerDataArray);
      setVisibleMarkerData(markerDataArray);
      setSelectedMarkerData(null);
    },
    [geocodeData, createMarker, setVisibleMarkerData, setSelectedMarkerData]
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
