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
  // const [reginCd, setReginCd] = useState<IReginCdData | null>(null);
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);
  console.log("apartment: ", apartment);

  // 공공 데이터 아파트 실거래가 조회
  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async (): Promise<void> => {
      try {
        const apartmentData = await axios.get<IApartmentData>("/api/apartment");
        setApartment(apartmentData.data);

        // const reginCdData = await axios.get<IReginCdData>("/api/reginCd");
        // setReginCd(reginCdData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // 페이지 로드 시 데이터 가져오기
    void fetchData();
  }, []);

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
    const initMap = async (): Promise<void> => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 16,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 아파트 데이터가 있는 경우에만 마커를 생성하고 표시
      if (apartment !== null) {
        await Promise.all(
          apartment.response.body.items.item.map(async (item) => {
            try {
              const { 법정동, 법정동본번코드, 아파트, 거래금액 } = item;
              const address = `${법정동} ${법정동본번코드} ${아파트}`;
              console.log(address);

              // 주소를 이용하여 좌표를 가져오는 함수 호출
              const { data: coords } = await axios.get<{
                latitude: number;
                longitude: number;
              }>(`/api/geocode?address=${encodeURIComponent(address)}`);

              // 좌표를 이용하여 마커 생성
              const markerOptions = {
                position: new window.naver.maps.LatLng(
                  coords.latitude,
                  coords.longitude,
                ),
                map,
                // title: 아파트,
              };
              const marker = new window.naver.maps.Marker(markerOptions);

              // 마커를 지도에 표시
              const infoWindow = new window.naver.maps.InfoWindow({
                content: address + 거래금액, // 인포 윈도우에 표시할 내용
              });

              window.naver.maps.Event.addListener(marker, "click", () => {
                infoWindow.open(map, marker);
              });
            } catch (error) {
              console.error("Error fetching geocode:", error);
            }
          }),
        );
      }

      // const address = "충무로4가 306 남산센트럴자이";
      // try {
      //   const { data: coords } = await axios.get<{
      //     latitude: number;
      //     longitude: number;
      //   }>(`/api/geocode?address=${encodeURIComponent(address)}`);
      //   const markerOptions = {
      //     position: new window.naver.maps.LatLng(
      //       coords.latitude,
      //       coords.longitude,
      //     ),
      //     map,
      //   };
      //   const marker = new window.naver.maps.Marker(markerOptions);

      //   const infoWindow = new window.naver.maps.InfoWindow({
      //     content: address, // 예시: 인포 윈도우에 표시할 내용
      //   });

      //   window.naver.maps.Event.addListener(marker, "click", () => {
      //     infoWindow.open(map, marker);
      //   });
      // } catch (error) {
      //   console.error("Error fetching geocode:", error);
      // }
    };

    // 클라이언트 ID가 로드된 후에 네이버 지도 API 스크립트 로드
    if (ncpClientId !== undefined) {
      loadMapScript();
    } else {
      console.error("NEXT_PUBLIC_NCP_CLIENT_ID is not defined");
    }
  }, [ncpClientId, apartment]);

  return (
    <>
      {/* {stanReginCd !== null ? JSON.stringify(stanReginCd) : "Loading..."} */}
      <div id="map" style={{ width: "100%", height: "300px" }}></div>
    </>
  );
}
