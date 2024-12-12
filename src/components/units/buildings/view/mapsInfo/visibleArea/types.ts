import type { IApartmentItem, IFirestore } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreData: IFirestore[];
  visibleMarkerData: IApartmentItem[];
}
