import { useEffect, useState } from "react";
import type { IGeocodeData } from "../types";
import { useNaverMaps } from "./useNaverMaps";

export const useSelectMarkerMaps = (props: IGeocodeData | null): void => {
  const [ncpClientId, setNcpClientId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setNcpClientId(process.env.NEXT_PUBLIC_NCP_CLIENT_ID);
  }, []);

  useNaverMaps({
    mapId: "map",
    ncpClientId,
    onMapReady: (map) => {
      if (props !== null) {
        const markerOptions = {
          position: new window.naver.maps.LatLng(props.latitude, props.longitude),
          map,
        };

        const marker = new window.naver.maps.Marker(markerOptions);
        marker.setMap(map);
        map.setCenter(markerOptions.position);
      }
    },
  });
};
