"use client";

import { useEffect } from "react";
import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";

import AllMarkerMaps from "@/src/components/units/allMarkerMaps";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams } from "@/src/commons/types";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeResults, loading, error, fetchData } = useAllGeocodeData(buildingType);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return <>{loading ? <LoadingSpinner size={100} /> : error !== null ? <p>Error loading data: {error.message}</p> : <AllMarkerMaps geocodeResults={geocodeResults} buildingType={buildingType} />}</>;
}
