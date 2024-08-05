"use client";

import { useEffect } from "react";
import AllMarkerMaps from "@/src/components/units/allMarkerMaps";
import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";

import type { IBuildingParams } from "@/src/commons/types";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeResults, loading, error, fetchData } = useAllGeocodeData(buildingType);

  useEffect(() => {
    // 페이지가 로드될 때 데이터를 가져오는 함수를 호출합니다
    void fetchData();
  }, [fetchData]); // 의존성 배열에 fetchData를 포함시킵니다

  if (loading) return <LoadingSpinner size={100} />;
  if (error !== null) return <p>Error loading data: {error.message}</p>;

  return <AllMarkerMaps geocodeResults={geocodeResults} buildingType={buildingType} />;
}
