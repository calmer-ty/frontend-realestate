import { useRef, useCallback } from "react";
import { clusterStyle, markerStyle } from "@/src/components/units/allMarkerMaps/styles";
import { shortenCityName } from "../commons/libraries/utils/regex";
import { useNaverMaps } from "@/src/hooks/useNaverMaps";
import { loadScript } from "@/src/commons/libraries/utils/naverMaps";
import type { IGeocodeEtcData, IMarkerData, IUseAllMarkerMapsProps } from "@/src/commons/types";

export const useAllMarkerMaps = (props: IUseAllMarkerMapsProps): void => {
  const { geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas } = props;

  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any | null>(null);

  // prettier-ignore
  const createMarker = useCallback((coord: IGeocodeEtcData) => {
      const { latitude, longitude, ...buildingsData } = coord;
      const markerIconContent = (): string => {
        const matchedFbirebaseData = firebaseDatas.find((firebaseData) => firebaseData.address === shortenCityName(buildingsData.address) || firebaseData.address === shortenCityName(buildingsData.address_road));
        if (matchedFbirebaseData !== undefined) {
          return `
            <div style="${markerStyle.containerActive}">
              <div style="${markerStyle.topAreaActive}">${Math.round(buildingsData.area * 0.3025)}평</div>
              <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(buildingsData.price / 10000).toFixed(1)}억</strong></div>
              <div style="${markerStyle.arrowActive}"></div>
            </div>`;
        } else {
          return `
            <div style="${markerStyle.container}">
              <div style="${markerStyle.topArea}">${Math.round(buildingsData.area * 0.3025)}평</div>
              <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(buildingsData.price / 10000).toFixed(1)}억</strong></div>
              <div style="${markerStyle.arrow}"></div>
            </div>`;
        }
      };

      const markerOptions = {
        position: new window.naver.maps.LatLng(latitude, longitude),
        map: null, // Set map to null initially
        icon: {
          content: markerIconContent(),
        },
      };

      const marker = new window.naver.maps.Marker(markerOptions);
      const markerData: IMarkerData = buildingsData;
      marker.set("data", markerData);

      window.naver.maps.Event.addListener(marker, "click", () => {
        setSelectedMarkerData(markerData);
      });

      return marker;
      
    },[firebaseDatas, setSelectedMarkerData]);

  const createClusterMarkers = useCallback(() => {
    const icons = [];
    for (let i = 1; i <= 5; i++) {
      icons.push({
        content: `<div style="${clusterStyle.container} background-image: url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      });
    }
    return icons;
  }, []);

  // prettier-ignore
  const updateVisibleMarkers = useCallback((map: any) => {
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
    },[geocodeResults, createMarker, createClusterMarkers, setSelectedMarkerData, setVisibleMarkerDatas]);

  // prettier-ignore
  const loadClusterScript = useCallback(
    (map: any) => {
      const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, () => {
        window.naver.maps.Event.addListener(map, "idle", () => {
          updateVisibleMarkers(map);
        });
        updateVisibleMarkers(map);
      });
    },[updateVisibleMarkers]);

  // prettier-ignore
  const onMapLoaded = useCallback((map: any) => {
    loadClusterScript(map);
  },[loadClusterScript]);

  useNaverMaps({ mapId: "map", onMapLoaded });
};
