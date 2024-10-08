import type { IFirestore, IMapMarker } from "@/src/commons/types";

export interface ISelectedAreaProps {
  selectedMarkerData: IMapMarker;
  firestoreDatas: IFirestore[];
  buildingType: string;
}
