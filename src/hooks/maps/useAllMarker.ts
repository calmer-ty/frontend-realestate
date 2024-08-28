import { useRef, useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/maps/useMapsLoader";
import { createMarkerClusteringOptions, loadScript, markerIconContent } from "@/src/commons/libraries/utils/naverMaps";
import type { IGeocodeEtcData, IMarkerData, IUseAllMarkerProps } from "@/src/commons/types";

export const useAllMarker = (props: IUseAllMarkerProps): void => {
  const { geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas } = props;

  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any | null>(null);

  const createMarker = useCallback(
    (coord: IGeocodeEtcData) => {
      const { latitude, longitude, ...buildingsData } = coord;

      const markerOptions = {
        position: new window.naver.maps.LatLng(latitude, longitude),
        map: null, // Set map to null initially
        icon: {
          content: markerIconContent(buildingsData, firebaseDatas),
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
    [firebaseDatas, setSelectedMarkerData]
  );

  const updateVisibleMarkers = useCallback(
    (map: any) => {
      const mapBounds = map.getBounds();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeResults.forEach((coord) => {
        if (coord !== undefined) {
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

      if (markerClusteringRef.current !== null) {
        markerClusteringRef.current.setMap(null);
      }
      markerClusteringRef.current = createMarkerClusteringOptions(map, markersRef.current);

      const markerDataArray = markersRef.current.map((marker) => marker.get("data"));
      setVisibleMarkerDatas(markerDataArray);
      setSelectedMarkerData(null);
    },
    [geocodeResults, createMarker, setSelectedMarkerData, setVisibleMarkerDatas]
  );

  const loadClusterScript = useCallback(
    (map: any) => {
      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        console.log("Cluster script loaded and executing");
        window.naver.maps.Event.addListener(map, "idle", () => {
          updateVisibleMarkers(map);
        });
        updateVisibleMarkers(map);
      });
    },
    [updateVisibleMarkers]
  );

  const onMapLoaded = useCallback(
    (map: any) => {
      loadClusterScript(map);
    },
    [loadClusterScript]
  );
  useMapsLoader({ mapId: "map", onMapLoaded });
};
