"use client";

import { memo } from "react";

import AllMarkerMaps from "@/src/components/units/allMarkerMaps";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams } from "@/src/commons/types";
import { useFetchAllGeocode } from "@/src/hooks/useFetchAllGeocode";

function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeResults, loading, error } = useFetchAllGeocode(buildingType);

  if (loading) {
    return <LoadingSpinner size={100} />;
  }
  if (error !== null) {
    return <p>Error loading data: {error.message}</p>;
  }

  return <AllMarkerMaps geocodeResults={geocodeResults} buildingType={buildingType} />;
}
export default memo(BuildingView);
