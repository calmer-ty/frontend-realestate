"use client";

import { useEffect, useMemo, useState } from "react";
import { useFetchBuildingData } from "@/src/hooks/api/useFetchBuildingData";
import { useFetchAllGeocodeData } from "@/src/hooks/api/useFetchAllGeocodeData";
import { useFetchFirestoreData } from "@/src/hooks/firebase/useFetchFirestoreData";
import { useFetchSelectGeocodeData } from "@/src/hooks/api/useFetchSelectGeocodeData";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";

import LoadingSpinner from "@/src/components/commons/loadingSpinner";
import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import MapsMenu from "./ui/mapsMenu";

import * as S from "./styles";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IBuildingParamsPromiseProps, IGeocodeData } from "@/src/commons/types";

export default function BuildingView({ params }: IBuildingParamsPromiseProps): JSX.Element {
  const [buildingType, setBuildingType] = useState<string | undefined>(undefined);
  // params를 비동기적으로 처리하려면 await로 기다려야 함
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const resolvedParams = await params;
      setBuildingType(resolvedParams.buildingType);
    };

    void fetchData();
  }, [params]);

  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | undefined>(undefined);
  const [visibleMarkerDatas, setvisibleMarkerDatass] = useState<IGeocodeData[]>([]);
  // 구 선택 hook
  const [regionName, setRegionName] = useState<string | undefined>(undefined);
  const [regionCode, setRegionCode] = useState<string | undefined>(undefined);

  // 파이어스토어 데이터패치  훅
  const { firestoreDatas } = useFetchFirestoreData("buildings");

  // API 패치 훅
  // const { fetchRegionData } = useFetchRegionData();
  const { buildingDatas, fetchBuildingDatas } = useFetchBuildingData({ regionCode, regionName, buildingType });
  const { geocode, fetchGeocodeData } = useFetchSelectGeocodeData({ regionName: regionName ?? DEFAULT_STRING_VALUE, buildingType: buildingType ?? DEFAULT_STRING_VALUE });
  const {
    geocodeDatas,
    fetchGeocodeDatas,
    loading: dataLoading,
    error,
  } = useFetchAllGeocodeData({ regionCode: regionCode ?? DEFAULT_STRING_VALUE, buildingType: buildingType ?? DEFAULT_STRING_VALUE });

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

  console.log("firestoreDatas: ", firestoreDatas);

  // 스테이트 값 바뀔 때마다 api 재요청 - 구 선택시 리렌더링
  useEffect(() => {
    if (regionName === undefined) return;
    void fetchGeocodeData();
  }, [regionName, fetchGeocodeData]);

  useEffect(() => {
    if (regionCode === undefined || buildingType === null) return;
    void fetchBuildingDatas();
  }, [regionCode, buildingType, fetchBuildingDatas]);

  // buildingDatas가 변경되면 지오코드 데이터를 요청 - buildingDatas 값 의존성 배열로 추가
  useEffect(() => {
    if (buildingDatas.length === 0) return;
    void fetchGeocodeDatas();
  }, [buildingDatas, fetchGeocodeDatas]);

  const { loading: mapLoading } = useAllMarker({
    geocode,
    geocodeDatas,
    matchingDatas,
    setSelectedMarkerData,
    setvisibleMarkerDatass,
  });

  // buildingType이 null일 때 로딩 상태 표시
  if (buildingType === undefined) {
    return <LoadingSpinner size={100} />;
  }
  if (error !== null) return <div>{error}</div>;

  return (
    <S.Container>
      <MapsMenu buildingType={buildingType} />

      <S.MapsWrap>
        <MapsInfo
          selectedMarkerData={selectedMarkerData}
          visibleMarkerDatas={visibleMarkerDatas}
          setSelectedMarkerData={setSelectedMarkerData}
          matchingDatas={matchingDatas}
          buildingType={buildingType}
        />
        <NaverMaps mapLoading={mapLoading} dataLoading={dataLoading} setRegionName={setRegionName} setRegionCode={setRegionCode} />
      </S.MapsWrap>
    </S.Container>
  );
}
