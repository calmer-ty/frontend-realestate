import type { IFirestore, IApartmentItem } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerData: IApartmentItem[];
  selectedMarkerData: IApartmentItem | null;
  firestoreData: IFirestore[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
