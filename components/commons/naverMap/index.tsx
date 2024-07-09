import { useEffect } from "react";
import type { NaverMapProps } from "@/commons/types";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
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
      script.onload = loadMarkerClustering;
      document.head.appendChild(script);
    };

    const loadMarkerClustering = (): void => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "/commons/libraries/markerClustering.js";
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };
    const initMap = async (): Promise<void> => {
      if (!window.naver || !window.MarkerClustering) {
        console.error(
          "네이버 맵 또는 마커 클러스터링 라이브러리가 로드되지 않았습니다."
        );
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_LEFT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      const markers: any[] = geocodeResults
        .filter((coord) => coord !== undefined && coord !== null)
        .map((coord) => {
          const { latitude, longitude, address, amount } = coord;

          const markerOptions = {
            position: new window.naver.maps.LatLng(latitude, longitude),
            map,
            draggable: true,
          };
          const marker = new window.naver.maps.Marker(markerOptions);

          const infoWindow = new window.naver.maps.InfoWindow({
            content: `${address} ${amount}억`, // 각 주소에 맞는 인포 윈도우 내용으로 변경
          });

          window.naver.maps.Event.addListener(marker, "click", () => {
            infoWindow.open(map, marker);
          });
          return marker;
        })
        .filter((marker) => marker !== null);

      // htmlMarker1 객체 정의
      const htmlMarker1 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(/example/images/cluster-marker-1.png);background-size:contain;"></div>',
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      };
      const htmlMarker2 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-2.png);background-size:contain;"></div>',
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      };
      const htmlMarker3 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://new window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-3.png);background-size:contain;"></div>',
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      };
      const htmlMarker4 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://new window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-4.png);background-size:contain;"></div>',
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      };
      const htmlMarker5 = {
        content:
          '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://new window.naver.maps.github.io/maps.js.ncp/docs/img/cluster-marker-5.png);background-size:contain;"></div>',
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      };

      const markerClustering = new window.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 8,
        map,
        markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [htmlMarker1],
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: (clusterMarker: any, count: any) => {
          clusterMarker
            .getElement()
            .querySelector("div:first-child").innerText = count;
        },
      });
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
