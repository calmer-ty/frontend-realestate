/** @jsxImportSource @emotion/react */
import MapsInfo from "./mapsInfo";
import NaverMaps from "./naverMaps";
import { useEffect, useState } from "react";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";
import { useFirestore } from "@/src/hooks/firestore/useFirestore";
import type { IFirestoreData, IMarkerData } from "@/src/commons/types";
import type { IAllMarkerMapsProps } from "./types";
import { mapStyle } from "./styles";

export default function AllMarkerMaps({ buildingType, geocodeResults }: IAllMarkerMapsProps): JSX.Element {
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);
  const { readFirestoreDatas } = useFirestore();

  const [firestoreDatas, setFirestoreDatas] = useState<IFirestoreData[]>([]);
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirestoreDatas("apartment");
      setFirestoreDatas(datas);
    };

    void readBuildings();
  }, [readFirestoreDatas]);

  useAllMarker({ geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firestoreDatas });
  return (
    <>
      <div css={mapStyle}>
        <NaverMaps geocodeResults={geocodeResults} />
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firestoreDatas={firestoreDatas} buildingType={buildingType} />
      </div>
    </>
  );
}
