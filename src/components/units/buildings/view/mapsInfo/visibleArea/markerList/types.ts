import type { IGeocodeData, IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IMarkerListProps {
  visibleMarkerData: IGeocodeData[];
  firestoreData: IFirestore[];
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}
