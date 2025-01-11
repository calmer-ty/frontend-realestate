"use client";

// import { useBuildingView } from "./hooks/useBuildingView";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";

import type { IBuildingParams, IFirestore, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";
import RegionSelect from "./select";
import { useEffect, useState } from "react";
import { useAllMarker } from "./hooks/useAllMarker";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useFetchAllGeocode } from "./hooks/useFetchAllGeocode";
import axios from "axios";

const regionCodeMap: Record<string, string> = {
  "서울특별시 종로구": "11110",
};

export default function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  // const { geocodeData, visibleMarkerData, selectedMarkerData, setSelectedMarkerData, firestoreData, loading, error } = useBuildingView(buildingType);
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();

  // 구 선택 hook
  const [selectedRegion, setSelectedRegion] = useState("");
  const { data: geocodeData, loading, error } = useFetchAllGeocode(buildingType, selectedRegion);

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const firestoreData = await readFirestores("buildings");
      setFirestoreData(firestoreData);
    };
    void readBuilding();
  }, [readFirestores, buildingType]);

  useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  // 구 선택 시 해당 지역 코드로 서버로 요청
  const handleRegionChange = async (region: string): Promise<void> => {
    setSelectedRegion(region); // 지역 선택 상태 저장
  };

  // selectedRegion 값이 변경될 때마다 서버에 다시 값을 요청
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const regionCode = regionCodeMap[selectedRegion];

      if (regionCode === "") {
        console.error("존재하지 않는 지역입니다.");
        return;
      }

      try {
        const response = await axios.get(`/api/fetchApartment?regionCode=${regionCode}`);

        if (response.status === 200) {
          console.log("Fetched data:", response.data); // 받은 데이터 로그 출력
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    void fetchData(); // selectedRegion 값이 변경될 때만 데이터 요청
  }, [selectedRegion]); // selectedRegion 값이 변경될 때만 실행됨

  if (error !== null) return <p>Error loading data: {error.message}</p>;

  return (
    <S.Container>
      <RegionSelect onSelectionChange={handleRegionChange} />
      <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
      <NaverMaps geocodeData={geocodeData} loading={loading} />
    </S.Container>
  );
}
