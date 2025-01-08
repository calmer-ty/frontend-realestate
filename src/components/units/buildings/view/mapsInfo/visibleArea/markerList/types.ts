import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IMarkerListProps {
  // visibleMarkerData: IGeocodeData[];
  // firestoreData: IFirestore[];
  matchingMarkerData: IGeocodeData[];
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}
