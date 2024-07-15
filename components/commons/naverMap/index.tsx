import { useEffect, useState } from "react";
import type { NaverMapProps, IGeocodeData, IMarkerData } from "@/commons/types";
import { markerStyle, mapStyle, clusterStyle } from "./styles";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

export default function NaverMap({ geocodeResults, ncpClientId }: NaverMapProps): JSX.Element {
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);

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
      let markers: any[] = [];
      let markerClustering: any;

      const createMarker = (coord: IGeocodeData): any => {
        const { latitude, longitude, ...apartmentData } = coord;
        console.log("address:", apartmentData.address);

        const markerOptions = {
          position: new window.naver.maps.LatLng(latitude, longitude),
          map,
          icon: {
            content: `<div style="${markerStyle.container}">
                              <div style="${markerStyle.top}">${Math.round(apartmentData.area * 0.3025)}평</div>
                              <div style="${markerStyle.bottom}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(apartmentData.amount / 10000).toFixed(1)}억</strong></div>
                              <div style="${markerStyle.arrow}"></div>
                            </div>`,
            anchor: new window.naver.maps.Point(12, 12),
          },
        };

        const marker = new window.naver.maps.Marker(markerOptions);
        // 마커에 데이터를 설정
        const markerData: IMarkerData = {
          ...apartmentData,
        };

        // 마커 데이터를 보냄
        marker.set("data", markerData);
        markerMap.get(`${apartmentData.location} ${apartmentData.address} ${apartmentData.apartmentName}`);

        // const infoWindow = new window.naver.maps.InfoWindow({
        //   content: `${address} ${amount}억`, // 각 주소에 맞는 인포 윈도우 내용으로 변경
        // });

        window.naver.maps.Event.addListener(marker, "click", () => {
          // infoWindow.open(map, marker);
          setSelectedMarkerData(markerData);
        });

        return marker;
      };

      // htmlMarker 객체 정의
      const createClusterMarkers = (): any => {
        const icons = [];
        for (let i = 1; i <= 5; i++) {
          icons.push({
            content: `<div style="${clusterStyle.container}background-image:url(https://navermaps.github.io/maps.js.ncp/docs/img/cluster-marker-${i}.png);"></div>`,
            size: new window.naver.maps.Size(40, 40),
            anchor: new window.naver.maps.Point(20, 20),
          });
        }
        return icons;
      };

      const updateVisibleMarkers = (): void => {
        const mapBounds = map.getBounds();

        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        // 보이는 영역 내의 마커만 생성
        geocodeResults.forEach((coord) => {
          if (coord !== undefined) {
            const { latitude, longitude } = coord;
            const position = new window.naver.maps.LatLng(latitude, longitude);

            if (mapBounds.hasLatLng(position) === true) {
              const marker = createMarker(coord);
              markers.push(marker);
            }
          }
        });

        // 클러스터링 업데이트
        if (markerClustering === true) {
          markerClustering.setMarkers(markers);
        } else {
          markerClustering = new window.MarkerClustering({
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
        }

        // 각 마커의 데이터를 배열에 저장
        const markerDataArray = markers.map((marker) => marker.get("data"));
        setMarkerDatas(markerDataArray);

        // idle 이벤트 발생 시 선택된 마커 데이터 초기화
        setSelectedMarkerData(null);
      };
      // 초기화 후 지도에 idle 이벤트 추가
      updateVisibleMarkers();
      window.naver.maps.Event.addListener(map, "idle", updateVisibleMarkers);
    };

    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [geocodeResults, ncpClientId]);

  console.log("markerDatas:", markerDatas);
  return (
    <>
      <div id="map" style={mapStyle.container}>
        <p style={mapStyle.message.loading}>{geocodeResults.length === 0 ? "지도 정보를 불러오는 중입니다." : ""}</p>
        <div style={mapStyle.info}>
          {selectedMarkerData !== null ? (
            <div style={mapStyle.info.selector.container}>
              <p style={mapStyle.info.selector.apartmentName}>
                <strong>{selectedMarkerData.apartmentName}</strong>
              </p>
              <div style={mapStyle.info.selector.recentDeal.container}>
                <span style={mapStyle.info.selector.recentDeal.title}>최근 실거래가</span>
                <p style={mapStyle.info.selector.recentDeal.content}>
                  <strong>
                    매매 {Math.floor(selectedMarkerData.amount / 10000)}억 {selectedMarkerData.amount % 10000}
                  </strong>
                  <p>
                    {selectedMarkerData.dealYear}.{selectedMarkerData.dealMonth}.{selectedMarkerData.dealDay}・{selectedMarkerData.floor}층・{selectedMarkerData.area}m²
                  </p>
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
          <ul>
            {markerDatas.map((el, index) => (
              <li key={`${el.address}_${index}`} style={mapStyle.info.list.item.container}>
                <p style={mapStyle.info.list.item.amount}>
                  <strong>
                    매매 {Math.floor(el.amount / 10000) !== 0 ? `${Math.floor(el.amount / 10000)}억` : ""} {el.amount % 10000} 만원
                  </strong>
                </p>
                <p>아파트・{el.apartmentName}</p>
                <p>
                  {el.area}m² {el.floor}층
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
