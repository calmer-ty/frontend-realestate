import type { IFirestore, ILocationData } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerDatas: ILocationData[];
  selectedMarkerData: ILocationData | null;
  firestoreDatas: IFirestore[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
