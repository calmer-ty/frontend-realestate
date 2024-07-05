import { useEffect } from "react";
import type { NaverMapProps } from "@/commons/types";

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

      // fetchGeocode 불러오기

      geocodeResults.forEach((coord) => {
        if (coord !== undefined && coord !== null) {
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
        }
      });
    };

    loadMapScript();
  }, [geocodeResults, ncpClientId]);
  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}
