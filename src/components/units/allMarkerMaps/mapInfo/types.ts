import type { IFirebaseData, IMarkerData } from "@/src/types";

export interface IMapInfoProps {
  visibleMarkerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  firebaseDatas: IFirebaseData[];
}
