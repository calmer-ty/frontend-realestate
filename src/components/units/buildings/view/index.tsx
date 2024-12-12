"use client";

import { memo, useEffect, useState } from "react";
import { useFetchAllGeocode } from "@/src/components/units/buildings/view/hooks/useFetchAllGeocode";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useAllMarker } from "./hooks/useAllMarker";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";
import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams, IFirestore, IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);

  const { data: geocodeData, loading, error } = useFetchAllGeocode(buildingType);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const firestoreData = await readFirestores(buildingType);
      setFirestoreData(firestoreData);
    };
    void readBuilding();
  }, [readFirestores, buildingType]);

  useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });

  console.log("selectedMarkerData === ", selectedMarkerData);

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
        <MapsInfo visibleMarkerData={visibleMarkerData} selectedMarkerData={selectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />
        <NaverMaps geocodeResults={geocodeData} />
      </S.Container>
    </>
  );
}
export default memo(BuildingView);
