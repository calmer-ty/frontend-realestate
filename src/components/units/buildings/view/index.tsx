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
import { useFetchUserInputGeocodeData } from "@/src/hooks/api/useFetchUserInputGeocodeData";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치  훅
  const { firestoreDatas } = useFetchFirestoreData("buildings");

  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const { apartmentData, fetchApartmentData } = useFetchApartmentData(regionCode);
  const { geocodeDatas, fetchGeocodeDatas, loading: dataLoading, error } = useFetchAllGeocodeData({ regionCode, buildingType });
  const { geocodeDatas: userInputGeocodeDatas, fetchGeocodeDatas: fetchUserInputGeocodeDatas } = useFetchUserInputGeocodeData({ firestoreDatas });
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });

  console.log("userInputGeocodeDatas: ", userInputGeocodeDatas);

  useFetchApi({ regionName, regionCode, apartmentData, fetchApartmentData, fetchGeocodeData, fetchGeocodeDatas, fetchUserInputGeocodeDatas });
  const { loading: mapLoading } = useAllMarker({ geocode, geocodeDatas, setSelectedMarkerData, setVisibleMarkerData, firestoreDatas });

  if (error !== null) return <div>{error}</div>;
  return (
    <S.Container>
      <MapsInfo
        selectedMarkerData={selectedMarkerData}
        visibleMarkerData={visibleMarkerData}
        setSelectedMarkerData={setSelectedMarkerData}
        firestoreData={firestoreDatas}
        buildingType={buildingType}
      />
      <NaverMaps mapLoading={mapLoading} dataLoading={dataLoading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
    </S.Container>
  );
}
