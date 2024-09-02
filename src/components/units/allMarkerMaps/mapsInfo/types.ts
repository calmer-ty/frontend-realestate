import type { IFirebaseData, IMarkerData } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  firebaseDatas: IFirebaseData[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
