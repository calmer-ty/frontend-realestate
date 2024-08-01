"use client";

// import axios from "axios";
import { useEffect } from "react";
import AllMarkerMaps from "@/src/components/units/allMarkerMaps";
import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";

export default function BuildingView(): JSX.Element {
  const { geocodeResults, loading, error, fetchData } = useAllGeocodeData();

  useEffect(() => {
    // 페이지가 로드될 때 데이터를 가져오는 함수를 호출합니다
    void fetchData();
  }, [fetchData]); // 의존성 배열에 fetchData를 포함시킵니다

  if (loading) return <p>Loading...</p>;
  if (error !== null) return <p>Error loading data: {error.message}</p>;

  return <AllMarkerMaps geocodeResults={geocodeResults} />;
}
