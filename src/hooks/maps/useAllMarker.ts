import { useRef, useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";
import { createMarkerClusteringOptions, loadScript, markerIconContent } from "@/src/commons/libraries/utils/naverMaps";
import type { IGeocodeEtcData, IMarkerData, IUseAllMarkerProps } from "@/src/commons/types";

export const useAllMarker = ({ firestoreDatas, geocodeResults, setSelectedMarkerData, setVisibleMarkerDatas }: IUseAllMarkerProps): void => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>(null);
  const isClusterScriptLoadedRef = useRef(false);

  const createMarker = useCallback(
    (coord: IGeocodeEtcData) => {
      const { latitude, longitude, ...buildingsData } = coord;
      if (buildingsData === undefined) return;
      const markerOptions = {
        position: new window.naver.maps.LatLng(latitude, longitude),
        map: null, // Set map to null initially
        icon: {
          content: markerIconContent(buildingsData, firestoreDatas),
        },
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      const markerData: IMarkerData = buildingsData;
      marker.set("data", markerData);

      window.naver.maps.Event.addListener(marker, "click", () => {
        setSelectedMarkerData(markerData);
      });

      return marker;
    },
    [firestoreDatas, setSelectedMarkerData]
  );

  const updateMarkers = useCallback(
    (map: any) => {
      const mapBounds = map.getBounds();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeResults.forEach((coord) => {
        if (coord != null) {
          const { latitude, longitude } = coord;
          const position = new window.naver.maps.LatLng(latitude, longitude);

          if (mapBounds.hasLatLng(position) === true) {
            const existingMarker = markersRef.current.find((marker) => marker.getPosition().equals(position));
            if (existingMarker === undefined) {
              const marker = createMarker(coord);
              markersRef.current.push(marker);
            }
          }
        }
      });

      if (markerClusteringRef.current != null) {
        markerClusteringRef.current.setMap(null);
      }
      markerClusteringRef.current = createMarkerClusteringOptions(map, markersRef.current);

      const markerDataArray = markersRef.current.map((marker) => marker.get("data"));
      setVisibleMarkerDatas(markerDataArray);
      setSelectedMarkerData(null);
    },
    [geocodeResults, createMarker, setVisibleMarkerDatas, setSelectedMarkerData]
  );

  const loadClusterScript = useCallback(
    (map: any) => {
      if (isClusterScriptLoadedRef.current) {
        console.log("클러스터 스크립트가 이미 로드되었습니다.");
        window.naver.maps.Event.addListener(map, "idle", () => {
          updateMarkers(map);
        });
        updateMarkers(map);
        return;
      }

      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        console.log("클러스터를 실행합니다.");
        isClusterScriptLoadedRef.current = true; // 스크립트가 로드되었음을 기록
        window.naver.maps.Event.addListener(map, "idle", () => {
          updateMarkers(map);
        });
        updateMarkers(map);
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
