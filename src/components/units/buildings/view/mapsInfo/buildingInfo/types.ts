import type { IFirestore, IGeocodeData } from "@/src/commons/types";

export interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  firestoreData: IFirestore[];
  buildingType: string;
  isSelected: boolean;
}
