"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchAllGeocodeData } from "@/src/hooks/api/useFetchAllGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useFetchSelectGeocodeData } from "@/src/hooks/api/useFetchSelectGeocodeData";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import BuildingTypeButtons from "./ui/buildingTypeButtons";

import * as S from "./styles";
import type { IBuildingParams, IGeocodeData } from "@/src/commons/types";

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  const [visibleMarkerDatas, setvisibleMarkerDatass] = useState<IGeocodeData[]>([]);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치  훅
  const { firestoreDatas } = useFetchFirestoreData("buildings");

  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const { apartmentDatas, fetchApartmentDatas } = useFetchApartmentData(regionCode);
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });
  const { geocodeDatas, fetchGeocodeDatas, loading: dataLoading, error } = useFetchAllGeocodeData({ regionCode, buildingType });

  // geocodeDatas와 firestoreDatas를 비교하여 매칭되는 데이터만 필터링
  const matchingDatas = useMemo(() => {
    return firestoreDatas.filter((firestoreData) => {
      // firestoreData와 geocodeDatas의 주소가 일치하는지 확인
      return geocodeDatas.some((geocodeData) => {
        // jibunAddress 또는 rodeAddress가 firestoreData의 address에 포함되는지 확인
        return geocodeData.geocode.jibunAddress.includes(firestoreData.address) || geocodeData.geocode.roadAddress.includes(firestoreData.address);
      });
    });
  }, [geocodeDatas, firestoreDatas]);

  // 스테이트 값 바뀔 때마다 api 재요청
  // 구 선택시 리렌더링
  useEffect(() => {
    if (regionName === undefined) return;
    void fetchGeocodeData();
  }, [regionName, fetchGeocodeData]);

  // regionCode가 변경되면 아파트 데이터를 요청
  useEffect(() => {
    if (regionCode === undefined) return;
    void fetchApartmentDatas();
  }, [regionCode, fetchApartmentDatas]);

  // apartmentData가 변경되면 지오코드 데이터를 요청 - apartmentDatas 값 의존성 배열로 추가
  useEffect(() => {
    if (apartmentDatas.length === 0) return;
    void fetchGeocodeDatas();
  }, [apartmentDatas, fetchGeocodeDatas]);

  //
  // useEffect(() => {
  //   if (geocodeDatas.length === 0) return;
  //   void fetchUserGeocodeDatas();
  // }, [geocodeDatas, fetchUserGeocodeDatas]);

  const { loading: mapLoading } = useAllMarker({
    geocode,
    geocodeDatas,
    matchingDatas,
    setSelectedMarkerData,
    setvisibleMarkerDatass,
  });

  if (error !== null) return <div>{error}</div>;
  return (
    <S.Container>
      <S.MapMenu>
        <BuildingTypeButtons label="buildingType" name="buildingType" selectLabels={["아파트", "오피스텔", "연립다세대"]} />
      </S.MapMenu>
      <MapsInfo
        selectedMarkerData={selectedMarkerData}
        visibleMarkerDatas={visibleMarkerDatas}
        setSelectedMarkerData={setSelectedMarkerData}
        matchingDatas={matchingDatas}
        buildingType={buildingType}
      />
      <NaverMaps mapLoading={mapLoading} dataLoading={dataLoading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
    </S.Container>
  );
}
