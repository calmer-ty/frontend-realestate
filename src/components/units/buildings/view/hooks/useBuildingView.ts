import { useEffect, useState } from "react";
import { useFetchAllGeocode } from "./useFetchAllGeocode";
import { useFirestore } from "@/src/hooks/firebase/useFirestore";
import { useAllMarker } from "./useAllMarker";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";

interface IUseBuildingDataProps {
  geocodeData: IGeocodeData[];
  visibleMarkerData: IGeocodeData[];
  selectedMarkerData: IGeocodeData | null;
  firestoreData: IFirestore[];
  loading: boolean;
  error: Error | null;
}

export const useBuildingView = (buildingType: string): IUseBuildingDataProps => {
  const [visibleMarkerData, setVisibleMarkerData] = useState<IGeocodeData[]>([]);
  const [selectedMarkerData, setSelectedMarkerData] = useState<IGeocodeData | null>(null);
  const [firestoreData, setFirestoreData] = useState<IFirestore[]>([]);

  const { data: geocodeData, loading, error } = useFetchAllGeocode(buildingType);
  const { readFirestores } = useFirestore();

  useEffect(() => {
    const readBuilding = async (): Promise<void> => {
      const firestoreData = await readFirestores(buildingType);
      setFirestoreData(firestoreData);
    };
    void readBuilding();
  }, [readFirestores, buildingType]);

  useAllMarker({ geocodeData, setSelectedMarkerData, setVisibleMarkerData, firestoreData });
  console.log("visibleMarkerData: ", visibleMarkerData);
  return { geocodeData, visibleMarkerData, selectedMarkerData, firestoreData, loading, error };
};
