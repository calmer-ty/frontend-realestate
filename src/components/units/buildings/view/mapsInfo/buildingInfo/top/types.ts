import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IBuildingInfoTopProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}
