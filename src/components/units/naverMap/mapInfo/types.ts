import type { IMarkerData } from "@/src/types";

export interface IMapInfoProps {
  markerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
}

export interface IFirebaseData {
  address: string;
  addressDetail: string;
}
