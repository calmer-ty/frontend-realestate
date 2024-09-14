import type { IFirestoreData, IMarkerData } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firestoreDatas: IFirestoreData[];
  visibleMarkerDatas: IMarkerData[];
}
