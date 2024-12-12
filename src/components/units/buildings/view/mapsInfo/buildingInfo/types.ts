import type { IFirestore, IApartmentItem } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: IApartmentItem;
  firestoreData: IFirestore[];
  buildingType: string;
  isSelected: boolean;
}
