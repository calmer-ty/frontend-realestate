import BuildingInfo from "../buildingInfo";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
}

export default function SelectedArea({ selectedMarkerData, setSelectedMarkerData, matchingData, buildingType }: ISelectedAreaProps): JSX.Element {
  return <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} matchingData={matchingData} buildingType={buildingType} />;
}
