"use client";

import { useFetchAllGeocodeData } from "@/src/hooks/useFetchAllGeocodeData";

import AllMarkerMaps from "@/src/components/units/allMarkerMaps";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams } from "@/src/commons/types";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeResults, loading, error } = useFetchAllGeocodeData(buildingType);
  // console.log("buildingType: ", buildingType);
  console.log("~~~렌더링~~~");

  if (loading) {
    return <LoadingSpinner size={100} />;
  }
  if (error !== null) {
    return <p>Error loading data: {error.message}</p>;
  }
  return <AllMarkerMaps geocodeResults={geocodeResults} buildingType={buildingType} />;
}
