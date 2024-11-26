import type { IFirestore, ILocationData } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: ILocationData;
  firestoreDatas: IFirestore[];
  buildingType: string;
  isSelected: boolean;
}
