import { useState } from "react";

import MapsInfo from "./mapsInfo";
import MapsView from "./mapsView";

import { useAllMarkerMaps } from "@/src/hooks/useAllMarkerMaps";
import { useFetchFirestore } from "@/src/hooks/useFetchFireBase";

import type { IMarkerData } from "@/src/commons/types";
import type { INaverMapProps } from "./types";

import { mapStyle } from "./styles";

export default function NaverMap(props: INaverMapProps): JSX.Element {
  const { geocodeResults } = props;
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);
  const firebaseDatas = useFetchFirestore();

  useAllMarkerMaps({ geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div style={mapStyle}>
        <MapsInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firebaseDatas={firebaseDatas} />
        <MapsView geocodeResults={geocodeResults} />
      </div>
    </>
  );
}
