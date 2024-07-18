import { useState } from "react";

import MapInfo from "./mapInfo";
import MapView from "./mapView";

import { useNaverMap } from "@/src/hooks/useNaverMap";
import { useFetchFireBase } from "@/src/hooks/useFetchFireBase";

import type { IMarkerData } from "@/src/types";
import type { INaverMapProps } from "./types";

import { mapStyle } from "./styles";

export default function NaverMap(props: INaverMapProps): JSX.Element {
  const { ncpClientId, geocodeResults } = props;
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);
  const firebaseDatas = useFetchFireBase();

  useNaverMap({ ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData, firebaseDatas });

  return (
    <>
      <div style={mapStyle}>
        <MapInfo markerDatas={markerDatas} selectedMarkerData={selectedMarkerData} firebaseDatas={firebaseDatas} />
        <MapView geocodeResults={props.geocodeResults} />
      </div>
    </>
  );
}
