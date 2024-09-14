import type { IFirestoreData, IMarkerData } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: IMarkerData;
  firestoreDatas: IFirestoreData[];
  buildingType: string;
  isSelected: boolean;
}
