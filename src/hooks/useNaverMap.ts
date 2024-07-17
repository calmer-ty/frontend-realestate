import { useEffect, useRef } from "react";
import { clusterStyle, markerStyle } from "@/src/components/units/naverMap/styles";
import { shortenCityName } from "../commons/libraries/utils";
import type { IGeocodeData, IMarkerData, INaverMapHooksProps } from "@/src/types";

declare global {
  interface Window {
    naver: any;
    MarkerClustering: any;
  }
}

export const useNaverMap = (props: INaverMapHooksProps): void => {
  const { ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData, firebaseDatas } = props;

  // let markers: any[] = [];
  // let markerClustering: any;
  const markersRef = useRef<any[]>([]);
  const markerClusteringRef = useRef<any>();

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

      // 마커를 담을 Map 생성
      //   const markerMap = new Map();
      // let selectedMarker: any = null; // 선택된 마커 저장 변수
      const map = new window.naver.maps.Map("map", mapOptions);

      const createMarker = (coord: IGeocodeData): any => {
        const { latitude, longitude, ...apartmentData } = coord;

        // 아이콘 스타일 정의
        // const defaultStyles = markerStyle.topArea;
        // const selectedStyles = markerStyle.topAreaSelected;

        const markerIconContent = (): string => {
          const matchedFbData = firebaseDatas.find((fbData) => fbData.address === shortenCityName(apartmentData.address));
          if (matchedFbData !== undefined) {
            return `
              <div style="${markerStyle.containerActive}">
                <div style="${markerStyle.topAreaActive}">${Math.round(apartmentData.area * 0.3025)}평</div>
                <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(apartmentData.amount / 10000).toFixed(1)}억</strong></div>
                <div style="${markerStyle.arrowActive}"></div>
              </div>`;
          } else {
            return `
              <div style="${markerStyle.container}">
                <div style="${markerStyle.topArea}">${Math.round(apartmentData.area * 0.3025)}평</div>
                <div style="${markerStyle.bottomArea}"><span style="${markerStyle.bottom_unit1}">매</span> <strong>${(apartmentData.amount / 10000).toFixed(1)}억</strong></div>
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
        // 마커에 데이터를 설정
        const markerData: IMarkerData = apartmentData;
        marker.set("data", markerData);

        // markerMap.get(`${apartmentData.location} ${apartmentData.address} ${apartmentData.apartmentName}`);

        // const infoWindow = new window.naver.maps.InfoWindow({
        //   content: `${address} ${amount}억`, // 각 주소에 맞는 인포 윈도우 내용으로 변경
        // });

        window.naver.maps.Event.addListener(marker, "click", () => {
          // // 이전에 선택된 마커가 있을 경우 아이콘을 초기화
          // if (selectedMarker !== null) {
          //   selectedMarker.setIcon({
          //     content: markerIconContent(defaultStyles),
          //   });
          // }
          // // 선택된 마커를 현재 클릭된 마커로 업데이트
          // selectedMarker = marker;

          // // 클릭된 마커의 아이콘 변경
          // marker.setIcon({
          //   content: markerIconContent(selectedStyles),
          // });

          // 선택된 마커 데이터 설정
          setSelectedMarkerData(markerData);
        });

        return marker;
      };

      // htmlMarker 객체 정의
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

        // 기존 마커 제거
        // markers.forEach((marker) => marker.setMap(null));
        // markers = [];
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // 보이는 영역 내의 마커만 생성
        geocodeResults.forEach((coord) => {
          if (coord !== undefined) {
            const { latitude, longitude } = coord;
            const position = new window.naver.maps.LatLng(latitude, longitude);

            if (mapBounds.hasLatLng(position) === true) {
              const marker = createMarker(coord);
              // markers.push(marker);
              markersRef.current.push(marker);
            }
          }
        });

        // 클러스터링 업데이트
        // if (!markerClusteringRef.current) {
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
        // } else {
        //   // 이미 초기화된 경우 마커 업데이트
        //   markerClusteringRef.current.setMarkers(markersRef.current);
        // }

        // 각 마커의 데이터를 배열에 저장
        const markerDataArray = markersRef.current.map((marker) => marker.get("data"));
        setMarkerDatas(markerDataArray);
        setSelectedMarkerData(null);
      };
      // 초기화 후 지도에 idle 이벤트 추가
      updateVisibleMarkers();
      window.naver.maps.Event.addListener(map, "idle", updateVisibleMarkers);
    };

    loadScript(NAVER_MAP_SCRIPT_URL, () => {
      loadScript(MARKER_CLUSTERING_SCRIPT_URL, initMap);
    });
  }, [geocodeResults, ncpClientId, setMarkerDatas, setSelectedMarkerData, firebaseDatas]);
};
