"use client";

import { useState } from "react";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchAllGeocodeData } from "@/src/hooks/api/useFetchAllGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useAllMarker } from "./hooks/mapMarker/useAllMarker";
import { useFetchApi } from "./hooks/useFetchApi";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import RegionSelect from "./select";

import type { IBuildingParams, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";
import { useFetchSelectGeocodeData } from "@/src/hooks/api/useFetchSelectGeocodeData";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  // 파이어스토어 데이터패치  훅
  const { firestoreData } = useFetchFirestoreData(buildingType);
  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeDatas, fetchGeocodeDatas, error } = useFetchAllGeocodeData({ regionName, regionCode, buildingType });
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });

  useFetchApi({ regionName, regionCode, apartmentData, fetchApartmentData, fetchGeocodeData, fetchGeocodeDatas });
  const { mapLoading } = useAllMarker({ geocode, geocodeDatas, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  if (error !== null) return <div>{error}</div>;
  return (
    <S.Container>
      <RegionSelect setRegionName={setRegionName} setRegionCode={setRegionCode} />
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeDatas} mapLoading={mapLoading} />
    </S.Container>
  );
}
