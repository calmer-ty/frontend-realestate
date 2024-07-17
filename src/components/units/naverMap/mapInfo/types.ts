import type { IMarkerData } from "@/src/types";

export interface IMapInfoProps {
  markerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
  matchingFirebaseData: IFirebaseData | undefined;
}

export interface IFirebaseData {
  address: string;
  addressDetail: string;
}
