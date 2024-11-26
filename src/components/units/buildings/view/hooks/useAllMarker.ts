import { useRef, useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { markerIconContent } from "@/src/commons/libraries/utils/maps/marker";
import { createMarkerClusteringOptions } from "@/src/commons/libraries/utils/maps/cluster";
import { loadScript } from "@/src/commons/libraries/utils/maps/init";

import type { IGeocodeData, ILocationData, IUseAllMarkerProps } from "@/src/commons/types";

export const useAllMarker = ({ firestoreDatas, geocodeResults, setSelectedMarkerData, setVisibleMarkerDatas }: IUseAllMarkerProps): void => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>(null);
  const isClusterScriptLoadedRef = useRef(false);

  const createMarker = useCallback(
    (coord: IGeocodeData) => {
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
      const markerData: ILocationData = buildingsData;
      marker.set("data", markerData);

      window.naver.maps.Event.addListener(marker, "click", () => {
        setSelectedMarkerData(markerData);
      });

      return marker;
    },
    [firestoreDatas, setSelectedMarkerData]
  );
  // console.log(createMarker);
  const updateMarkers = useCallback(
    async (map: any) => {
      const mapBounds = map.getBounds();

      // ========== 뷰포트에 따른 API 호출 로직
      // const southWest = mapBounds.getSW();
      // const northEast = mapBounds.getNE();

      // console.log("southWest: ", southWest);
      // console.log("northEast: ", northEast);

      // try {
      //   const response = await axios.get(`/api/fetchAllGeocodeTest`, {
      //     params: {
      //       swLat: southWest.lat(),
      //       swLng: southWest.lng(),
      //       neLat: northEast.lat(),
      //       neLng: northEast.lng(),
      //     },
      //   });
      //   console.log("응답 데이터:", response.data);
      // } catch (error) {
      //   console.error("API 호출 중 에러:", error);
      // }

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeResults?.forEach((coord) => {
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
    // [setVisibleMarkerDatas, setSelectedMarkerData]
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
