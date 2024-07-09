import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true); // 초기 로딩 상태는 true로 설정

  useEffect(() => {
    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    const MARKER_CLUSTERING_SCRIPT_URL =
      "/commons/libraries/markerClustering.js";

    const loadScript = (src: string, onload: () => void): void => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.async = true;
      script.onload = onload;
      document.head.appendChild(script);
    };

    const initMap = async (): Promise<void> => {
      // if (!window.naver || !window.MarkerClustering) {
      //   console.error(
      //     "네이버 맵 또는 마커 클러스터링 라이브러리가 로드되지 않았습니다."
      //   );
      //   return;
      // }

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

      const markers = geocodeResults
        .filter((coord) => coord !== undefined && coord !== null)
        .map((coord) => createMarker(coord, map));

      const markerClustering = new window.MarkerClustering({
        minClusterSize: 2,
        maxZoom: 12, // 최대 줌 레벨을 더 높여 세분화된 클러스터링 적용
        map,
        markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: createHtmlMarkers(),
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: (clusterMarker: any, count: any) => {
          clusterMarker
            .getElement()
            .querySelector("div:first-child").innerText = count;
        },
      });

      const updateMarkers = throttle(() => {
        const mapBounds = map.getBounds();
        markers.forEach((marker) => {
          const position = marker.getPosition();
          if (mapBounds.hasLatLng(position) !== undefined) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        });
        markerClustering.setMap(map);
      }, 100);
      // 데이터 로딩이 완료되면 로딩 상태를 false로 변경
      setLoading(false);

      window.naver.maps.Event.addListener(map, "idle", updateMarkers);
      window.naver.maps.Event.addListener(map, "zoom_changed", updateMarkers);
    };

    const createMarker = (
      coord: {
        latitude: number;
        longitude: number;
        address: string;
        amount: number;
      },
      map: any
    ): any => {
      const { latitude, longitude, address, amount } = coord;
      const markerOptions = {
        position: new window.naver.maps.LatLng(latitude, longitude),
        map,
        draggable: true,
      };
      const marker = new window.naver.maps.Marker(markerOptions);
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `${address} ${amount}억`,
      });
      window.naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });
      return marker;
    };

    const createHtmlMarkers = (): any => {
      const icons = [];
      for (let i = 1; i <= 5; i++) {
        icons.push({
          content: `<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);background-size:contain;"></div>`,
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        });
      }
      return icons;
    };

    const throttle = (func: (...args: any[]) => void, limit: number): any => {
      let inThrottle: boolean;
      return function <T extends any[]>(...args: T) {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [geocodeResults, ncpClientId]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      {loading ? "로딩중" : "아님"}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>);
    </>
  );
}
