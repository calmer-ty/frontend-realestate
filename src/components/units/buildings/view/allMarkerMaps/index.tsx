/** @jsxImportSource @emotion/react */
import MapsInfo from "./mapsInfo";
import NaverMaps from "./naverMaps";
import { useEffect, useState } from "react";
import { useAllMarker } from "@/src/hooks/maps/useAllMarker";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useFetchAllGeocode } from "@/src/hooks/useFetchAllGeocode";
import type { IFirestore, IMapMarker } from "@/src/commons/types";
import type { IAllMarkerMapsProps } from "./types";
import { mapStyle } from "./styles";

export default function AllMarkerMaps({ buildingType }: IAllMarkerMapsProps): JSX.Element {
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMapMarker[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMapMarker | null>(null);
  const [firestoreDatas, setFirestoreDatas] = useState<IFirestore[]>([]);
  const { readFirestores } = useFirestore();
  const { geocodeResults } = useFetchAllGeocode(buildingType);

  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirestores("apartment");
      setFirestoreDatas(datas);
    };

    void readBuildings();
  }, [readFirestores]);

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
