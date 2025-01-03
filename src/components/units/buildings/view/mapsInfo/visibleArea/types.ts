import type { IGeocodeData, IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreData: IFirestore[];
  visibleMarkerData: IGeocodeData[];
  selectedData: IGeocodeData | null;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}
