import type { IFirestore, ILocationData } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: ILocationData;
  firestoreDatas: IFirestore[];
  buildingType: string;
}
