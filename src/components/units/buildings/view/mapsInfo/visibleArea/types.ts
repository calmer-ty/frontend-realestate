import type { IGeocodeData, IFirestore } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreData: IFirestore[];
  visibleMarkerData: IGeocodeData[];
}
