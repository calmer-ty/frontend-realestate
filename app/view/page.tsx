"use client";

import axios from "axios";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
interface GeocodeResult {
  latitude: number;
  longitude: number;
}

// 데이터의 타입 정의

export default function ViewPage(): JSX.Element {
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 환경 변수에서 클라이언트 ID 가져오기
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  useEffect(() => {
    // 네이버 지도 API 스크립트 로드 함수
    const loadMapScript = (): void => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    };

    // 네이버 지도 초기화 함수
    const initMap = async (): Promise<void> => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // axios를 사용하여 지오코딩 데이터를 가져오는 부분을 별도의 useEffect로 분리
      const fetchGeocode = async (): Promise<void> => {
        try {
          const addresses = ["충무로4가 306 남산센트럴자이", "중앙로 25길 21"];
          const { data: coords } = await axios.post<GeocodeResult[]>(
            "/api/geocode",
            {
              addresses,
            },
          );
          console.log(coords); // 받은 좌표 데이터를 출력

          coords.forEach((coord, index) => {
            if (coord !== undefined && coord !== null) {
              const { latitude, longitude } = coord;

              const markerOptions = {
                position: new window.naver.maps.LatLng(latitude, longitude),
                map,
              };
              const marker = new window.naver.maps.Marker(markerOptions);

              const infoWindow = new window.naver.maps.InfoWindow({
                content: addresses[index], // 각 주소에 맞는 인포 윈도우 내용으로 변경
              });

              window.naver.maps.Event.addListener(marker, "click", () => {
                infoWindow.open(map, marker);
              });
            }
          });
        } catch (error) {
          console.error("Error fetching geocode:", error);
        }
      };

      void fetchGeocode(); // fetchGeocode 함수 호출
    };

    // 클라이언트 ID가 로드된 후에 네이버 지도 API 스크립트 로드
    if (ncpClientId !== undefined && ncpClientId !== null) {
      loadMapScript();
      console.log(ncpClientId);
    } else {
      console.error("NEXT_PUBLIC_NCP_CLIENT_ID is not defined");
    }
  }, [ncpClientId]); // ncpClientId가 변경될 때마다 useEffect가 재실행되도록 설정
  return (
    <>
      {/* {stanReginCd !== null ? JSON.stringify(stanReginCd) : "Loading..."} */}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
}
