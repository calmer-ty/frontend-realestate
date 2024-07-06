import { useEffect } from "react";
import type { NaverMapProps } from "@/commons/types";

declare global {
  interface Window {
    naver: any;
  }
}

export default function NaverMap({
  geocodeResults,
  ncpClientId,
}: NaverMapProps): JSX.Element {
  useEffect(() => {
    const loadMapScript = (): void => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    const initMap = async (): Promise<void> => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      const markers: any[] = geocodeResults
        .filter((coord) => coord !== undefined && coord !== null)
        .map((coord) => {
          // if (coord !== undefined && coord !== null) {
          const { latitude, longitude, address, amount } = coord;

          const markerOptions = {
            position: new window.naver.maps.LatLng(latitude, longitude),
            map,
          };
          const marker = new window.naver.maps.Marker(markerOptions);

          const infoWindow = new window.naver.maps.InfoWindow({
            content: `${address} ${amount}억`, // 각 주소에 맞는 인포 윈도우 내용으로 변경
            // content: `임시`, // 각 주소에 맞는 인포 윈도우 내용으로 변경
          });

          window.naver.maps.Event.addListener(marker, "click", () => {
            infoWindow.open(map, marker);
          });
          return marker;
          // }
          // return null;
        })
        .filter((marker) => marker !== null);

      // 보이는 곳만 마커 불러오기
      const updateMarkers = (map: any, markers: any): void => {
        const mapBounds = map.getBounds();

        markers.forEach((marker: any) => {
          const position = marker.getPosition();
          if (mapBounds.hasLatLng(position) === true) {
            showMarker(map, marker);
          } else {
            hideMarker(marker);
          }
        });
      };

      const showMarker = (map: any, marker: any): void => {
        if (marker.getMap() === true) return;
        marker.setMap(map);
      };

      const hideMarker = (marker: any): void => {
        if (marker.getMap() === false) return;
        marker.setMap(null);
      };

      window.naver.maps.Event.addListener(map, "idle", function () {
        updateMarkers(map, markers);
      });
    };

    loadMapScript();
  }, [geocodeResults, ncpClientId]);
  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
