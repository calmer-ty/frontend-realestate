import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  firestoreData: IFirestore[];
  buildingType: string;
}
