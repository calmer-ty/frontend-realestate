import { useState } from "react";

import MapInfo from "./mapInfo";
import MapView from "./mapView";

import { useAllMarkerMaps } from "@/src/hooks/useAllMarkerMaps";
import { useFetchFireBase } from "@/src/hooks/useFetchFireBase";

import type { IMarkerData } from "@/src/types";
import type { INaverMapProps } from "./types";

import { mapStyle } from "./styles";

export default function NaverMap(props: INaverMapProps): JSX.Element {
  const { ncpClientId, geocodeResults } = props;
  const [visibleMarkerDatas, setVisibleMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);
  const firebaseDatas = useFetchFireBase();

  useAllMarkerMaps({ ncpClientId, geocodeResults, setVisibleMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div style={mapStyle}>
        <MapInfo visibleMarkerDatas={visibleMarkerDatas} selectedMarkerData={selectedMarkerData} firebaseDatas={firebaseDatas} />
        <MapView geocodeResults={geocodeResults} />
      </div>
    </>
  );
}
