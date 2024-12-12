import type { IFirestore, IGeocodeData } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  firestoreData: IFirestore[];
  buildingType: string;
}
