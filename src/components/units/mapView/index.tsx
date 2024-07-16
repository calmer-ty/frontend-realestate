import { useState } from "react";
import { mapStyle } from "./styles";
import { useNaverMap } from "@/src/hooks/useNaverMap";
import MapInfo from "../mapInfo";
import type { INaverMapProps, IMarkerData } from "@/src/types";

export default function NaverMap({ geocodeResults, ncpClientId }: INaverMapProps): JSX.Element {
  const [markerDatas, setMarkerDatas] = useState<IMarkerData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IMarkerData | null>(null);

  useNaverMap({ ncpClientId, geocodeResults, setMarkerDatas, setSelectedMarkerData });
  return (
    <>
      <div style={mapStyle.wrap}>
        <MapInfo markerDatas={markerDatas} selectedMarkerData={selectedMarkerData} />
        <div id="map" style={mapStyle.container}>
          <p style={mapStyle.message.loading}>{geocodeResults.length === 0 ? "지도 정보를 불러오는 중입니다." : ""}</p>
        </div>
      </div>
    </>
  );
}
