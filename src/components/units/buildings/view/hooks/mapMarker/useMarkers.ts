import { useCallback, useRef } from "react";
import { clusteringOptions } from "@/src/commons/libraries/utils/maps/cluster";
import { createMarker } from "@/src/commons/libraries/utils/maps/marker";

import type { IGeocodeData, IMapMarkerParams } from "@/src/commons/types";

interface IUseMapMarkersReturn {
  updateMarkers: (map: any) => Promise<void>;
}

export const useMarkers = ({ geocodeDatas, firestoreDatas, setVisibleMarkerData, setSelectedMarkerData }: IMapMarkerParams): IUseMapMarkersReturn => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();

  const updateMarkers = useCallback(
    async (map: any) => {
      // console.log("Current geocodeData:", geocodeData); // 여기서 geocodeData 상태를 확인
      const mapBounds = map.getBounds();
      const processedPositions = new Set<string>();

      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      geocodeDatas?.forEach((geocodeData) => {
        const position = new window.naver.maps.LatLng(geocodeData.geocode?.latitude, geocodeData.geocode?.longitude);
        const positionKey = `${geocodeData.geocode?.latitude},${geocodeData.geocode?.longitude}`;

        if (mapBounds.hasLatLng(position) === true && !processedPositions.has(positionKey)) {
          const marker = createMarker({ geocodeData, firestoreDatas, setSelectedMarkerData });
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
    [geocodeDatas, firestoreDatas, setVisibleMarkerData, setSelectedMarkerData]
  );

  return { updateMarkers };
};
