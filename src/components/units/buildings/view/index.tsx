"use client";

import { memo, useEffect, useState } from "react";
import { useFetchAllGeocode } from "@/src/components/units/buildings/view/hooks/useFetchAllGeocode";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useAllMarker } from "./hooks/useAllMarker";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams, IFirestore, ILocationData } from "@/src/commons/types";
import * as S from "./styles";

function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<ILocationData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<ILocationData | null>(null);
  // firestore의 값을 불러온 후 변수를 사용한다
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);

  const { data, loading, error } = useFetchAllGeocode(buildingType);

  console.log("data ===== ", data);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirestores(buildingType);
      setFirestoreDatas(datas);
    };
    void readBuildings();
  }, [readFirestores, buildingType]);

  useAllMarker({ data, setVisibleMarkerDatas, setSelectedMarkerData, firestoreDatas });

  if (loading) {
    return <LoadingSpinner size={100} />;
  }
  if (error !== null) {
    console.error("Error loading data:", error);
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <>
      <S.Container>
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firestoreDatas={firestoreDatas} buildingType={buildingType} />
        <NaverMaps geocodeResults={data} />
      </S.Container>
    </>
  );
}
export default memo(BuildingView);
