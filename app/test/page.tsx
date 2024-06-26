"use client";

import axios from "axios";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

export default function TestPage(): JSX.Element {
  const [data, setData] = useState<any>(null);
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // 환경 변수에서 클라이언트 ID 가져오기
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get("/api/apartmentInfo");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // 페이지 로드 시 데이터 가져오기
    void fetchData();
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
    const initMap = (): void => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 예시: 지도 클릭 이벤트
      window.naver.maps.Event.addListener(map, "click", (e: any) => {
        console.log("지도를 클릭했습니다.", e.latlng);
      });
    };

    // 클라이언트 ID가 로드된 후에 네이버 지도 API 스크립트 로드
    if (ncpClientId !== undefined) {
      loadMapScript();
    } else {
      console.error("NEXT_PUBLIC_NCP_CLIENT_ID is not defined");
    }
  }, [ncpClientId]);

  return (
    <>
      {data !== null ? JSON.stringify(data) : "Loading..."}
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}
