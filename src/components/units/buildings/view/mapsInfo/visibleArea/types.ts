import type { IFirestore, ILocationData } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreDatas: IFirestore[];
  visibleMarkerDatas: ILocationData[];
}
