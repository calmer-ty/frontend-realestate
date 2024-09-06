/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import MapsInfo from "./mapsInfo";
import NaverMaps from "./naverMaps";

import { useAllMarker } from "@/src/hooks/maps/useAllMarker";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import type { IFirebaseData, IMarkerData } from "@/src/commons/types";
import type { IAllMarkerMapsProps } from "./types";

import { mapStyle } from "./styles";

export default function AllMarkerMaps({ buildingType, geocodeResults }: IAllMarkerMapsProps): JSX.Element {
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);
  const { readFirebaseDatas } = useFirebase();

  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirebaseDatas("apartment");
      setFirebaseDatas(datas);
    };

    void readBuildings();
  }, [readFirebaseDatas]);

  useAllMarker({ geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div css={mapStyle}>
        <NaverMaps geocodeResults={geocodeResults} />
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firebaseDatas={firebaseDatas} buildingType={buildingType} />
      </div>
    </>
  );
}
