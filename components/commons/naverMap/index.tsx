import { useEffect, useState } from "react";
import type { NaverMapProps, IMarkerData } from "@/commons/types";
import { markerStyle, mapStyle } from "./styles"; // markerStyles 파일에서 markerStyle 가져오기

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

export default function NaverMap({ geocodeResults, ncpClientId }: NaverMapProps): JSX.Element {
  //
  const [visibleMarkerGroup, setVisibleMarkerGroup] = useState<IMarkerData[]>([]);

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
      if (typeof window.naver === "undefined" || typeof window.MarkerClustering === "undefined") {
        console.error("네이버 맵 또는 마커 클러스터링 라이브러리가 로드되지 않았습니다.");
        return;
      }

      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
          style: window.naver.maps.ZoomControlStyle.SMALL,
        },
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 마커를 담을 Map 생성
      const markerMap = new Map();

      const markers: any[] = geocodeResults
        .filter((coord) => coord !== undefined && coord !== null)
        .map((coord) => {
          const { latitude, longitude, address, amount, area } = coord;

          // 이미 해당 주소의 마커가 있는지 확인
          if (markerMap.has(address)) {
            // 이미 있는 경우 기존 마커를 사용
            return markerMap.get(address);
          }

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

          // 마커에 데이터를 설정
          marker.set("address", address);
          marker.set("amount", amount);
          marker.set("area", area);

          // 마커를 Map에 추가
          markerMap.set(address, marker);

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
        minClusterSize: 2,
        maxZoom: 13,
        map,
        markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: createClusterMarkers(),
        indexGenerator: [10, 100, 200, 500, 1000],
        stylingFunction: (clusterMarker: any, count: any) => {
          clusterMarker.getElement().querySelector("div:first-child").innerText = count;
        },
      });

      // 보이는 곳만 마커 불러오기

      const updateMarkers = (map: any, markers: any): void => {
        const mapBounds = map.getBounds();
        const visibleMarkers: IMarkerData[] = [];

        markers.forEach((marker: any) => {
          const position = marker.getPosition();
          if (mapBounds.hasLatLng(position) === true) {
            const markerData: IMarkerData = {
              address: marker.get("address"),
              amount: marker.get("amount"),
              area: marker.get("area"),
            };
            visibleMarkers.push(markerData);
          }
        });

        setVisibleMarkerGroup(visibleMarkers);
      };

      // 보이는 곳만 마커 불러오기
      updateMarkers(map, markers);

      window.naver.maps.Event.addListener(map, "idle", function () {
        markerClustering.setMap(map);
        updateMarkers(map, markers);
      });
    };

    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [geocodeResults, ncpClientId]);

  console.log("visibleMarkerGroup: ", visibleMarkerGroup);

  return (
    <>
      <div id="map" style={mapStyle.container}>
        <div style={mapStyle.info}>
          <p style={mapStyle.info.message}>{geocodeResults.length === 0 ? "지도 정보를 불러오는 중입니다." : ""}</p>
        </div>
        <ul style={mapStyle.list}>
          {visibleMarkerGroup.map((el, index) => {
            return (
              <li key={`${el.address}_${index}`}>
                <p>Address: {el.address}</p>
                <p>Amount: {el.amount}</p>
                <p>Area: {el.area}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
