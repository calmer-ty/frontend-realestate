import { clusteringOptions } from "@/src/commons/libraries/utils/maps/cluster";
import { createMarker } from "@/src/commons/libraries/utils/maps/marker";
import type { IGeocodeData, IMapMarkerProps } from "@/src/commons/types";
import { useCallback, useRef } from "react";

interface IUseMapMarkersReturn {
  updateMarkers: (map: any) => Promise<void>;
}

export const useMapMarkers = ({ geocodeData, firestoreData, setVisibleMarkerData, setSelectedMarkerData }: IMapMarkerProps): IUseMapMarkersReturn => {
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();

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

  return { updateMarkers };
};
