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
  const [loading, setLoading] = useState(true);
  // CSS 스타일 객체 정의

  useEffect(() => {
    const NAVER_MAP_SCRIPT_URL = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
    const MARKER_CLUSTERING_SCRIPT_URL = "/libraries/markerClustering.js";

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

      const markers: any[] = geocodeResults
        .filter((coord) => coord !== undefined && coord !== null)
        .map((coord) => {
          const { latitude, longitude, address, amount, area } = coord;

          const markerStyle = {
            container: `
              position: relative;
              min-width: 56px;
              display: flex;
              flex-direction: column;
              align-items: center;
              border: 1px solid #254336;
              border-radius: 5px;
              color: #FFF;
            `,
            top: `
              width: 100%;
              border-top-left-radius: inherit;
              border-top-right-radius: inherit;
              background-color: #6B8A7A;
              text-align: center;
            `,
            bottom: `
              width: 100%;
              padding: 2px;
              border-bottom-left-radius: inherit;
              border-bottom-right-radius: inherit;
              background-color: #FFF;
              color: #000;
              text-align: center;
          `,
            bottom_unit1: `
              font-size: 12px;
            `,
            arrow: `
              width: 14px;
              height: 14px;
              background-color: #FFF;
              position: absolute;
              bottom: -7px;
              left: 50%;
              transform: translateX(-50%) rotate(135deg);
              border: 1px solid #254336;
              /* border-right: none; */
              /* border-bottom: none; */
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
            `,
          };

          const markerOptions = {
            position: new window.naver.maps.LatLng(latitude, longitude),
            map,
            icon: {
              content: `<div style="${markerStyle.container}">
                          <div style="${markerStyle.top}">${area}평</div>
                          <div style="${markerStyle.bottom}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${amount}억</strong></div>
                          <div style="${markerStyle.arrow}"></div> 
                        </div>`,
              anchor: new window.naver.maps.Point(12, 12),
            },
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

      // htmlMarker 객체 정의
      const createClusterMarkers = (): any => {
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

      const markerClustering = new window.MarkerClustering({
        minClusterSize: 3,
        maxZoom: 13,
        map,
        markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: createClusterMarkers(),
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: (clusterMarker: any, count: any) => {
          clusterMarker
            .getElement()
            .querySelector("div:first-child").innerText = count;
        },
      });

      // 클러스터링 완료 후 로딩 상태 업데이트
      window.naver.maps.Event.addListener(
        markerClustering,
        "clusteringend",
        () => {
          setLoading(false);
        }
      );

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
        markerClustering.setMap(map);
        updateMarkers(map, markers);
      });
    };

    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [geocodeResults, ncpClientId]);
  console.log("loading: ", loading);

  return (
    <>
      {loading ? "로딩중" : "완료"}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>;
    </>
  );
}
