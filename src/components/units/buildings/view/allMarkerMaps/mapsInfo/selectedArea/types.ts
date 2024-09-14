import type { IFirestoreData, IMarkerData } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: IMarkerData;
  firestoreDatas: IFirestoreData[];
  buildingType: string;
}
