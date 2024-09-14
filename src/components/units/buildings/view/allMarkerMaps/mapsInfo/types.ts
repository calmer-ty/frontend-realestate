import type { IFirestoreData, IMarkerData } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  firestoreDatas: IFirestoreData[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
