import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IBuildingInfoProps {
  selectedData: IGeocodeData;
  setSelectedItem: Dispatch<SetStateAction<IGeocodeData | null>>;
  firestoreData: IFirestore[];
  buildingType: string;
}
