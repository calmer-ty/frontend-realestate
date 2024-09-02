import type { IFirebaseData, IMarkerData } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedMarkerData: IMarkerData;
  firebaseDatas: IFirebaseData[];
  buildingType: string;
}
