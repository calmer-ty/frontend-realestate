import type { IFirebaseData, IMarkerData } from "@/src/types";

export interface IMapsInfoProps {
  visibleMarkerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  firebaseDatas: IFirebaseData[];
}
