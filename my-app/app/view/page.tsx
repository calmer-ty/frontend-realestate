"use client";

import axios from "axios";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}
interface IGeocodeData {
  latitude: number;
  longitude: number;
  address: string;
}
// 데이터의 타입 정의

export default function ViewPage(): JSX.Element {
  const [geocodeResults, setGeocodeResults] = useState<IGeocodeData[]>([]);
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get<IGeocodeData[]>("/api/geocode");
        setGeocodeResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // 페이지 로드 시 데이터 가져오기
    void fetchData();
  }, []);

  console.log(geocodeResults);

  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
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

      // fetchGeocode 불러오기
      const fetchGeocode = async (): Promise<void> => {
        try {
          geocodeResults.forEach((coord, index) => {
            console.log(coord); // 받은 좌표 데이터를 출력
            if (coord !== undefined && coord !== null) {
              const { latitude, longitude, address } = coord;

              const markerOptions = {
                position: new window.naver.maps.LatLng(latitude, longitude),
                map,
              };
              const marker = new window.naver.maps.Marker(markerOptions);

              const infoWindow = new window.naver.maps.InfoWindow({
                content: address, // 각 주소에 맞는 인포 윈도우 내용으로 변경
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
  }, [ncpClientId, geocodeResults]); // ncpClientId가 변경될 때마다 useEffect가 재실행되도록 설정
  return (
    <>
      {/* {stanReginCd !== null ? JSON.stringify(stanReginCd) : "Loading..."} */}
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
}
