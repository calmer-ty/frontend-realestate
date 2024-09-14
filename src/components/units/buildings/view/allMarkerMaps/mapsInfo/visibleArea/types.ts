import type { IFirebaseData, IMarkerData } from "@/src/commons/types";

export interface IVisibleAreaProps {
  buildingType: string;
  firebaseDatas: IFirebaseData[];
  visibleMarkerDatas: IMarkerData[];
}
