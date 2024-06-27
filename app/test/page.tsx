"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import type { IApartmentData } from "@/common/types/types";

declare global {
  interface Window {
    naver: any;
  }
}

// 데이터의 타입 정의

export default function TestPage(): JSX.Element {
  const [apartment, setApartment] = useState<IApartmentData | null>(null);
  const [reginCd, setReginCd] = useState<any>(null);
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);
  // const [priceNumber, setPriceNumber] = useState<number | undefined>(undefined);

  console.log(apartment);
  console.log(reginCd);

  // 공공 데이터 아파트 실거래가 조회
  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async (): Promise<void> => {
      try {
        const apartmentData = await axios.get<IApartmentData>("/api/apartment");
        setApartment(apartmentData.data);

        const reginCdData = await axios.get<IApartmentData>("/api/reginCd");
        setReginCd(reginCdData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // 페이지 로드 시 데이터 가져오기
    void fetchData();
  }, []);

  // useEffect(() => {
  //   const apartmentPrice =
  //     apartment?.response?.body?.items?.item?.[0]?.거래금액;
  //   if (apartmentPrice !== undefined) {
  //     // 반점 제거
  //     const priceWithoutComma = apartmentPrice.replace(/,/g, "");
  //     // 숫자로 변환하여 상태에 저장
  //     const parsedPrice = parseFloat(priceWithoutComma) / 10000;
  //     setPriceNumber(parsedPrice);
  //     // 여기서부터 지도 로직에 추가할 수 있습니다.
  //     // 예를 들어, 지도에 마커를 추가하는 로직 등을 이어서 작성할 수 있습니다.
  //   } else {
  //     console.log("거래금액이 없습니다.");
  //   }
  // }, [apartment]);

  // 네이버 지도
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
    const initMap = (): void => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      const markerOptions = {
        position: new window.naver.maps.LatLng(37.5665, 126.978), // 마커 위치 (서울시청)
        map,
      };
      const marker = new window.naver.maps.Marker(markerOptions);

      // 마커를 클릭했을 때 이벤트 처리 (인포 윈도우 열기)
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `${"priceNumber"} 억`,
      });
      window.naver.maps.Event.addListener(marker, "click", function (e: any) {
        infoWindow.open(map, marker);
      });
      // // 예시: 지도 클릭 이벤트
      // window.naver.maps.Event.addListener(map, "click", (e: any) => {
      //   console.log("지도를 클릭했습니다.", e.latlng);
      // });
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
      {/* {stanReginCd !== null ? JSON.stringify(stanReginCd) : "Loading..."} */}
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}
