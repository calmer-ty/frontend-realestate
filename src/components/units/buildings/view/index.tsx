"use client";

import { useBuildingView } from "./hooks/useBuildingView";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeData, visibleMarkerData, selectedMarkerData, firestoreData, loading, error } = useBuildingView(buildingType);
  if (loading) return <LoadingSpinner size={100} />;
  if (error !== null) return <p>Error loading data: {error.message}</p>;

  return (
    <S.Container>
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} />
    </S.Container>
  );
}
