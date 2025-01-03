import type { IGeocodeData, IFirestore } from "@/src/commons/types";

export interface IMarkerListProps {
  visibleMarkerData: IGeocodeData[];
  firestoreData: IFirestore[];
  onClickInfo: (el: IGeocodeData) => void;
}
