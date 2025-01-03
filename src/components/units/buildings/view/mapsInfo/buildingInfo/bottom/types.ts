import type { IFirestore, IGeocodeData } from "@/src/commons/types";

export interface IBuildingInfoBottomProps {
  selectedData: IGeocodeData;
  firestoreData: IFirestore[];
  buildingType: string;
}
