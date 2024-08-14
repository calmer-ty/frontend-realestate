/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";

import MapsInfo from "./mapsInfo";
import NaverMaps from "./naverMaps";

import { useAllMarkerMaps } from "@/src/hooks/useAllMarkerMaps";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import type { IFirebaseData, IMarkerData } from "@/src/commons/types";
import type { IAllMarkerMapsProps } from "./types";

import { mapStyle } from "./styles";

export default function AllMarkerMaps(props: IAllMarkerMapsProps): JSX.Element {
  const { buildingType, geocodeResults } = props;
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

  useAllMarkerMaps({ geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div css={mapStyle}>
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firebaseDatas={firebaseDatas} buildingType={buildingType} />
        <NaverMaps geocodeResults={geocodeResults} />
      </div>
    </>
  );
}
