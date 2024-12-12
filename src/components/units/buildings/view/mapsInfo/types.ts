import type { IFirestore, IGeocodeData } from "@/src/commons/types";

export interface IMapsInfoProps {
  visibleMarkerData: IGeocodeData[];
  selectedMarkerData: IGeocodeData | null;
  firestoreData: IFirestore[];
  buildingType: string;
}

export interface IScroll {
  scroll: boolean;
}
