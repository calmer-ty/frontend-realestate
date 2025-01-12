"use client";

// import { useBuildingView } from "./hooks/useBuildingView";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAllMarker } from "./hooks/useAllMarker";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
// import { useFetchAllGeocode } from "./hooks/useFetchAllGeocode";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import RegionSelect from "./select";

import type { IApartmentItem, IBuildingParams, IFirestore, IGeocodeData } from "@/src/commons/types";
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
  // 아파트 데이터 상태 관리
  const [apartmentData, setApartmentData] = useState<IApartmentItem[]>([]);
  // 지오코드 데이터 상태 관리
  const [geocodeData, setGeocodeData] = useState<IGeocodeData[]>([]);
  console.log("geocodeData: ", geocodeData);

  // 아파트 패치 훅

  const fetchApartmentData = useCallback(async (regionCode: string): Promise<void> => {
    if (regionCode === undefined) {
      console.error("존재하지 않는 지역입니다.");
      return;
    }

    try {
      const response = await axios.get<IApartmentItem[]>("/api/fetchApartment", {
        params: { regionCode },
      });

      if (response.status === 200) {
        setApartmentData(response.data);
        console.log("Fetched apartment data:", response.data); // 받은 데이터 로그 출력
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, []);

  // 지오코드 패치 훅
  const fetchGeocodeData = useCallback(
    async (regionCode: string): Promise<void> => {
      try {
        const response = await axios.get<IGeocodeData[]>("/api/fetchAllGeocode", {
          params: { buildingType, regionCode },
        });
        if (response.status === 200) {
          setGeocodeData(response.data);
          console.log("Fetched geocode data:", response.data);
        } else {
          throw new Error("Failed to fetch geocode data");
        }
      } catch (err) {
        console.error("Error fetching geocode data:", err);
      }
    },
    [buildingType] // buildingType이 변경될 때만 함수가 재정의됨
  );

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
