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
  const { apartmentDatas, fetchApartmentDatas } = useFetchApartmentData(regionCode);
  const { geocodeDatas, fetchGeocodeDatas, loading: dataLoading, error } = useFetchAllGeocodeData({ regionCode, buildingType });
  const { geocodeDatas: userGeocodeDatas, fetchGeocodeDatas: fetchUserGeocodeDatas } = useFetchUserInputGeocodeData({ firestoreDatas });
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });

  const filteredUserGeocodeDatas = userGeocodeDatas.filter((el) => {
    if (regionName !== undefined) {
      return el.data.address.includes(regionName);
    }
    return false; // regionName이 없으면 필터링에서 제외
  });

  useFetchApi({ regionName, regionCode, apartmentDatas, fetchApartmentDatas, fetchGeocodeData, fetchGeocodeDatas, fetchUserGeocodeDatas });
  const { loading: mapLoading } = useAllMarker({ geocode, geocodeDatas, userGeocodeDatas: filteredUserGeocodeDatas, firestoreDatas, setSelectedMarkerData, setVisibleMarkerData });

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
