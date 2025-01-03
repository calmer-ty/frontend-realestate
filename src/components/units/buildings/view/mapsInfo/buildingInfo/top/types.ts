import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IBuildingInfoTopProps {
  selectedData: IGeocodeData;
  setSelectedItem: Dispatch<SetStateAction<IGeocodeData | null>>;
}
