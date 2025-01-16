"use client";

import { useState } from "react";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchAllGeocodeData } from "@/src/hooks/api/useFetchAllGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useFetchSelectGeocodeData } from "@/src/hooks/api/useFetchSelectGeocodeData";
import { useAllMarker } from "./hooks/mapMarker/useAllMarker";
import { useFetchApi } from "./hooks/useFetchApi";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";

import * as S from "./styles";
import type { IBuildingParams, IGeocodeData } from "@/src/commons/types";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  // 파이어스토어 데이터패치  훅
  const { firestoreData } = useFetchFirestoreData("buildings");

  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeDatas, fetchGeocodeDatas, error } = useFetchAllGeocodeData({ regionCode, buildingType });
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });

  useFetchApi({ regionName, regionCode, apartmentData, fetchApartmentData, fetchGeocodeData, fetchGeocodeDatas });
  const { mapLoading } = useAllMarker({ geocode, geocodeDatas, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  if (error !== null) return <div>{error}</div>;
  return (
    <S.Container>
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeDatas} mapLoading={mapLoading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
    </S.Container>
  );
}
