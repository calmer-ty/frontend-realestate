/** @jsxImportSource @emotion/react */
"use client";

import NaverMaps from "./naverMaps";
import MapsInfo from "./mapsInfo";

import { memo, useEffect, useState } from "react";
// import { useFetchAllGeocode } from "@/src/components/units/buildings/view/hooks/useFetchAllGeocode";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useAllMarker } from "./hooks/useAllMarker";

// import LoadingSpinner from "@/src/components/commons/loadingSpinner";

import type { IBuildingParams, IFirestore, IMapMarker } from "@/src/commons/types";
import { mapStyle } from "./styles";

function BuildingView({ buildingType }: IBuildingParams): JSX.Element {
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMapMarker[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMapMarker | null>(null);
  // firestore의 값을 불러온 후 변수를 사용한다
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);

  // const { geocodeResults, loading, error } = useFetchAllGeocode(buildingType);
  // console.log("geocodeResults: ", geocodeResults);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirestores(buildingType);
      setFirestoreDatas(datas);
      console.log("datas === ", datas);
    };
    void readBuildings();
  }, [readFirestores, buildingType]);

  // useAllMarker({ geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firestoreDatas });
  useAllMarker({ setVisibleMarkerDatas, setSelectedMarkerData, firestoreDatas });

  // if (loading) {
  //   return <LoadingSpinner size={100} />;
  // }
  // if (error != null) {
  //   console.error("Error loading data:", error);
  //   return <p>Error loading data: {error.message}</p>;
  // }

  return (
    <>
      <div css={mapStyle}>
        {/* <NaverMaps geocodeResults={geocodeResults} /> */}
        <NaverMaps />
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firestoreDatas={firestoreDatas} buildingType={buildingType} />
      </div>
    </>
  );
}
export default memo(BuildingView);
