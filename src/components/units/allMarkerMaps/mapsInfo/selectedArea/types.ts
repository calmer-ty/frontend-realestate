import type { IFirebaseData, IMarkerData } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: IMarkerData;
  firebaseDatas: IFirebaseData[];
  buildingType: string;
}
