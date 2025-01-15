"use client";

import { useState } from "react";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchGeocodeData } from "@/src/hooks/api/useFetchGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useAllMarker } from "./hooks/mapMarker/useAllMarker";
import { useFetchApi } from "./hooks/useFetchApi";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import RegionSelect from "./select";

import type { IBuildingParams, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  // 구 선택 hook
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  // 파이어스토어 데이터패치  훅
  const { firestoreData } = useFetchFirestoreData(buildingType);
  // API 패치 훅
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeData, fetchGeocodeData, error } = useFetchGeocodeData(regionCode, buildingType);

  useFetchApi({ regionCode, apartmentData, fetchApartmentData, fetchGeocodeData });
  const { mapLoading } = useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  if (error !== null) return <div>{error}</div>;
  return (
    <S.Container>
      <RegionSelect setRegionCode={setRegionCode} />
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} mapLoading={mapLoading} />
    </S.Container>
  );
}
