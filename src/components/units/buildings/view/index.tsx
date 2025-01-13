"use client";

import { useEffect, useState } from "react";
import { useAllMarker } from "./hooks/useAllMarker";
import { useFetchRegionData } from "@/src/hooks/api/useFetchRegionData";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchGeocodeData } from "@/src/hooks/api/useFetchGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import RegionSelect from "./select";

import type { IBuildingParams, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";
// import { CITIES } from "@/src/commons/constants/regionData";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  // 구 선택 hook
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  // 파이어스토어 데이터패치  훅
  const { firestoreData } = useFetchFirestoreData(buildingType);
  // API 패치 훅
  const { fetchRegionData } = useFetchRegionData();
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeData, fetchGeocodeData } = useFetchGeocodeData(regionCode, buildingType);

  // regionCode가 변경되면 아파트 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined) return;
    void fetchRegionData();
  }, [regionCode, fetchRegionData]);

  // regionCode가 변경되면 아파트 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined) return;
    void fetchApartmentData(regionCode);
  }, [regionCode, fetchApartmentData]);

  // apartmentData가 변경되면 지오코드 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined || apartmentData === null) return;
    void fetchGeocodeData(regionCode);
  }, [regionCode, apartmentData, fetchGeocodeData]);

  // 맵 마커 훅
  useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  return (
    <S.Container>
      <RegionSelect setRegionCode={setRegionCode} />
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} />
    </S.Container>
  );
}
