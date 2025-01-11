"use client";

import { useBuildingView } from "./hooks/useBuildingView";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";

import type { IBuildingParams } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const { geocodeData, visibleMarkerData, selectedMarkerData, setSelectedMarkerData, firestoreData, loading, error } = useBuildingView(buildingType);
  if (error !== null) return <p>Error loading data: {error.message}</p>;

  // useRegion();
  return (
    <S.Container>
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} loading={loading} />
    </S.Container>
  );
}
