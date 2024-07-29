import { useRef, useCallback } from "react";
import { clusterStyle, markerStyle } from "@/src/components/units/allMarkerMaps/styles";
import { shortenCityName } from "../commons/libraries/utils/regex";
import { useNaverMaps } from "@/src/hooks/useNaverMaps";
import { loadScript } from "@/src/commons/libraries/utils/naverMaps";
import type { IGeocodeEtcData, IMarkerData, IUseAllMarkerMapsProps } from "@/src/types";

export const useAllMarkerMaps = (props: IUseAllMarkerMapsProps): void => {
  const { geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas } = props;

  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any | null>(null);

  const onMapLoaded = useCallback(
    (map: any) => {
      const createMarker = (coord: IGeocodeEtcData): any => {
        const { latitude, longitude, ...apartmentData } = coord;
        const markerIconContent = (): string => {
          const matchedFbData = firebaseDatas.find((fbData) => fbData.address === shortenCityName(apartmentData.address) || fbData.address === shortenCityName(apartmentData.address_street));
          if (matchedFbData !== undefined) {
            return `
            <div style="${markerStyle.containerActive}">
              <div style="${markerStyle.topAreaActive}">${Math.round(apartmentData.area * 0.3025)}평</div>
              <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(apartmentData.price / 10000).toFixed(1)}억</strong></div>
              <div style="${markerStyle.arrowActive}"></div>
            </div>`;
          } else {
            return `
            <div style="${markerStyle.container}">
              <div style="${markerStyle.topArea}">${Math.round(apartmentData.area * 0.3025)}평</div>
              <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(apartmentData.price / 10000).toFixed(1)}억</strong></div>
              <div style="${markerStyle.arrow}"></div>
            </div>`;
          }
        };

        const markerOptions = {
          position: new window.naver.maps.LatLng(latitude, longitude),
          map,
          icon: {
            content: markerIconContent(),
          },
        };

        const marker = new window.naver.maps.Marker(markerOptions);
        const markerData: IMarkerData = apartmentData;
        marker.set("data", markerData);

        window.naver.maps.Event.addListener(marker, "click", () => {
          setSelectedMarkerData(markerData);
        });

        return marker;
      };

      const createClusterMarkers = (): any => {
        const icons = [];
        for (let i = 1; i <= 5; i++) {
          icons.push({
            content: `<div style="${clusterStyle.container} background-image: url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20),
          });
        }
        return icons;
      };

      const updateVisibleMarkers = (): void => {
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
        const newMarkerClustering = new window.MarkerClustering({
          minClusterSize: 2,
          maxZoom: 13,
          map,
          markers: markersRef.current,
          disableClickZoom: false,
          gridSize: 120,
          icons: createClusterMarkers(),
          indexGenerator: [10, 100, 200, 500, 1000],
          stylingFunction: (clusterMarker: any, count: any) => {
            clusterMarker.getElement().querySelector("div:first-child").innerText = count;
          },
        });
        markerClusteringRef.current = newMarkerClustering;

        const markerDataArray = markersRef.current.map((marker) => marker.get("data"));
        setVisibleMarkerDatas(markerDataArray);
        setSelectedMarkerData(null);
      };

      const loadClusterScript = (): void => {
        const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
        loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
          updateVisibleMarkers();
          window.naver.maps.Event.addListener(map, "idle", updateVisibleMarkers);
        });
      };

      loadClusterScript();
    },
    [geocodeResults, firebaseDatas, setVisibleMarkerDatas, setSelectedMarkerData]
  );

  useNaverMaps("map", onMapLoaded);
};
