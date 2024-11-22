import { useMapsLoader } from "../../../../../hooks/maps/useMapsLoader";
import type { IGeocode } from "@/src/commons/types";

export const useSelectMarker = (props: IGeocode | null): void => {
  const onMapLoaded = (map: any): void => {
    if (props !== null) {
      const markerPosition = new window.naver.maps.LatLng(props.latitude, props.longitude);

      // 마커를 변수에 저장하고 이를 활용
      const marker = new window.naver.maps.Marker({
        position: markerPosition,
        map,
      });
      marker.setMap(map);

      // 지도 중심을 마커 위치로 이동
      map.setCenter(markerPosition);
    }
  };
  useMapsLoader({
    onMapLoaded,
  });
};
