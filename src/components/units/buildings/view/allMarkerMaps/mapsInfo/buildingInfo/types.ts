import type { IFirestore, IMapMarker } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: IMapMarker;
  firestoreDatas: IFirestore[];
  buildingType: string;
  isSelected: boolean;
}
