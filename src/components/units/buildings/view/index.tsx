"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetchApartmentData } from "@/src/hooks/api/useFetchApartmentData";
import { useFetchAllGeocodeData } from "@/src/hooks/api/useFetchAllGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useFetchSelectGeocodeData } from "@/src/hooks/api/useFetchSelectGeocodeData";
import { useFetchUserInputGeocodeData } from "@/src/hooks/api/useFetchUserInputGeocodeData";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";

import * as S from "./styles";
import type { IBuildingParams, IGeocodeData, IUserInputGeocodeData } from "@/src/commons/types";

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
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName, buildingType });
  const { geocodeDatas, fetchGeocodeDatas, loading: dataLoading, error } = useFetchAllGeocodeData({ regionCode, buildingType });
  const { geocodeDatas: userGeocodeDatas, fetchGeocodeDatas: fetchUserGeocodeDatas } = useFetchUserInputGeocodeData({ firestoreDatas });

  const filteredUserGeocodeDatas = useMemo(() => {
    if (regionName === undefined) return [];
    return userGeocodeDatas.filter((el) => el.data.address.includes(regionName));
  }, [userGeocodeDatas, regionName]);

  const { matchingGeocodeDatas, nonMatchingGeocodeDatas } = useMemo(() => {
    const matching: IUserInputGeocodeData[] = [];
    const nonMatching: IUserInputGeocodeData[] = [];

    filteredUserGeocodeDatas.forEach((userGeocodeData) => {
      const matched = geocodeDatas.find((geocodeData) => geocodeData.geocode.jibunAddress === userGeocodeData.geocode.jibunAddress);

      if (matched !== undefined) {
        matching.push(userGeocodeData); // 매칭된 데이터
      } else {
        nonMatching.push(userGeocodeData); // 매칭되지 않는 데이터
      }
    });
    return { matchingGeocodeDatas: matching, nonMatchingGeocodeDatas: nonMatching };
  }, [filteredUserGeocodeDatas, geocodeDatas]);
  console.log("matchingGeocodeDatas: ", matchingGeocodeDatas);
  console.log("nonMatchingGeocodeDatas: ", nonMatchingGeocodeDatas);

  // regionCode가 변경되면 아파트 데이터를 요청
  // useEffect(() => {
  //   if (regionCode === undefined) return;
  //   void fetchRegionData();
  // }, [regionCode, fetchRegionData]);

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
  useEffect(() => {
    if (geocodeDatas.length === 0) return;
    void fetchUserGeocodeDatas();
  }, [geocodeDatas, fetchUserGeocodeDatas]);
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
