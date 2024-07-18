import type { IFirebaseData, IMarkerData } from "@/src/types";

export interface IMapInfoProps {
  markerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  firebaseDatas: IFirebaseData[];
}
