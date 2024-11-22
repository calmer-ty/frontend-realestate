import type { IFirestore, IMapMarker } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreDatas: IFirestore[];
  visibleMarkerDatas: IMapMarker[];
}
