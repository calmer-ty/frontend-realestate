"use client";

import { useEffect, useState } from "react";
import { useAllMarker } from "./hooks/useAllMarker";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchGeocodeData } from "@/src/hooks/api/useFetchGeocodeData";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import RegionSelect from "./select";

import type { IBuildingParams, IFirestore, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

const regionCodeMap: Record<string, string> = {
  "서울특별시 종로구": "11110",
};

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  // 구 선택 hook
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeData, fetchGeocodeData } = useFetchGeocodeData(regionCode, buildingType);

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

  // 파이어스토어 불러오기
  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const firestoreData = await readFirestores("buildings");
      setFirestoreData(firestoreData);
    };
    void readBuilding();
  }, [readFirestores, buildingType]);

  // 구 선택 시 해당 지역 코드로 서버로 요청
  const handleRegionChange = async (region: string): Promise<void> => {
    const code = regionCodeMap[region];
    setRegionCode(code); // 선택된 지역 코드 업데이트
  };
  // 맵 마커 훅
  useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  return (
    <S.Container>
      <RegionSelect onSelectionChange={handleRegionChange} />
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} />
    </S.Container>
  );
}
