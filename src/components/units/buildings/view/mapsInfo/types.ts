import type { IFirestore, IMapMarker } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerDatas: IMapMarker[];
  selectedMarkerData: IMapMarker | null;
  firestoreDatas: IFirestore[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
