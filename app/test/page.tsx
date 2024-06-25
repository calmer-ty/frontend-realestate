"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function TestPage(): JSX.Element {
  const [data, setData] = useState<any>(null);
  // const naverMapsClientId = process.env.REACT_APP_NAVER_MAPS_Client_ID;
  // console.log(naverMapsClientId);

  useEffect(() => {
    // 데이터를 가져오는 함수
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get("/api/apartmentInfo");
        setData(response.data);
        console.log(response.data);
        console.log(response.data.response.body.items.item[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 데이터 가져오기
    void fetchData();
  }, []);

  useEffect(() => {
    // 네이버 지도 API 스크립트 요소 생성
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qy5xb3w0w6`;
    script.async = true;

    // 스크립트 로드 완료 후 처리할 함수
    const initMap = () => {
      // 네이버 지도 API가 로드된 후에 실행되어야 함
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 10,
      };

      const map = new window.naver.maps.Map("map", mapOptions);

      // 지도 클릭 이벤트 예시
      // window.naver.maps.Event.addListener(map, "click", (e) => {
      //   console.log("지도를 클릭했습니다.", e.latlng);
      // });
    };

    // 스크립트 로드 완료 이벤트 리스너 등록
    script.addEventListener("load", initMap);

    // 문서에 스크립트 추가
    document.head.appendChild(script);

    // useEffect 정리 함수
    return () => {
      // 스크립트 이벤트 리스너 제거
      script.removeEventListener("load", initMap);
      // 문서에서 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {data !== null ? JSON.stringify(data) : "Loading..."}
      <div id="map" style={{ width: "100%", height: "400px" }}>
        {/* 네이버 지도를 보여줄 영역 */}
      </div>
    </>
  );
}
