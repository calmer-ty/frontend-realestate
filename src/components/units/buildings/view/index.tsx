"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import NaverMap from "@/src/components/units/allMarkerMaps";
import type { IGeocodeData } from "@/src/types";

export default function BuildingView(): JSX.Element {
  const [geocodeResults, setGeocodeResults] = useState<IGeocodeData[]>([]);
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);
  useEffect(() => {
    // 페이지가 로드될 때 데이터를 가져오는 함수를 정의합니다
    const fetchData = async (): Promise<void> => {
      try {
        // API 엔드포인트로부터 아파트 데이터를 비동기적으로 가져옵니다
        const geocodeResponse = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode");
        setGeocodeResults(geocodeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error); // 데이터 가져오기 실패 시 에러를 콘솔에 로깅합니다
      }
    };

    void fetchData();
  }, []); // useEffect의 두 번째 매개변수는 의존성 배열로, 빈 배열을 넘겨 페이지가 로드될 때 한 번만 실행됩니다

  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  return <>{ncpClientId !== undefined ? <NaverMap geocodeResults={geocodeResults} ncpClientId={ncpClientId} /> : <div>Loading...</div>}</>;
}
