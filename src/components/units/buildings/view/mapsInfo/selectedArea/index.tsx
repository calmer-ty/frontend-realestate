import BuildingInfo from "../buildingInfo";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface ISelectedAreaProps {
  selectedMarkerData: IGeocodeData;
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  matchingDatas: IFirestore[];
}

export default function SelectedArea(props: ISelectedAreaProps): JSX.Element {
  const { selectedMarkerData, setSelectedMarkerData, matchingDatas } = props;

  return <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} matchingDatas={matchingDatas} />;
}
