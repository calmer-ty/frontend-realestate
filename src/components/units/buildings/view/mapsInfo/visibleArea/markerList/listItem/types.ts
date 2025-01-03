import type { IFirestore, IGeocodeData } from "@/src/commons/types";

export interface IVisibleAreaListItemProps {
  el: IGeocodeData;
  index: number;
  firestoreData: IFirestore[];
  onClickInfo: (el: IGeocodeData) => void;
}
