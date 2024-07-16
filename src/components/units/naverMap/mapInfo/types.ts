import type { IMarkerData } from "@/src/types";

export interface IMapInfoProps {
  markerDatas: IMarkerData[];
  selectedMarkerData: IMarkerData | null;
}
