import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IMapsInfoProps {
  visibleMarkerData: IGeocodeData[];
  selectedMarkerData: IGeocodeData | null;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  firestoreData: IFirestore[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
