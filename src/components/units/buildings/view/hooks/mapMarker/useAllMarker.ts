import { useCallback } from "react";
import { useMapsLoader } from "@/src/hooks/useMapsLoader";
import { useClusterScriptLoader } from "./useClusterScriptLoader";
import { useMapMarkers } from "./useMarkers";

import type { IMapMarkerProps } from "@/src/commons/types";

export const useAllMarker = ({ geocodeData, firestoreData, setSelectedMarkerData, setVisibleMarkerData }: IMapMarkerProps): void => {
  const { updateMarkers } = useMapMarkers({ geocodeData, firestoreData, setVisibleMarkerData, setSelectedMarkerData });
  const { loadClusterScript } = useClusterScriptLoader(updateMarkers);

  // prettier-ignore
  const onMapLoaded = useCallback((map: any) => { loadClusterScript(map) },[loadClusterScript]);
  useMapsLoader({ onMapLoaded });
};
