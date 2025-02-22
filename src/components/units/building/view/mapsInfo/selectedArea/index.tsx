import BuildingInfo from "../ui/buildingInfo";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
  mapMode: boolean;
}

export default function SelectedArea({ selectedMarkerData, setSelectedMarkerData, ...restProps }: ISelectedAreaProps): JSX.Element {
  return <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} {...restProps} />;
}
