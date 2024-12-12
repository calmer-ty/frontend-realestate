import type { IFirestore, ILocationData } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: ILocationData;
  firestoreData: IFirestore[];
  buildingType: string;
}
