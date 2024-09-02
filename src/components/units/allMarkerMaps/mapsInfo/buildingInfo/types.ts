import type { IFirebaseData, IMarkerData } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: IMarkerData;
  firebaseDatas: IFirebaseData[];
  buildingType: string;
  isSelected: boolean;
}
