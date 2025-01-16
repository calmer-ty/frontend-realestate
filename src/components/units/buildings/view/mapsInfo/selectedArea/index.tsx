import BuildingInfo from "../buildingInfo";
import type { ISelectedAreaProps } from "./types";

export default function SelectedArea(props: ISelectedAreaProps): JSX.Element {
  const { buildingType, firestoreData, selectedMarkerData, setSelectedMarkerData } = props;

  return <BuildingInfo selectedData={selectedMarkerData} setSelectedData={setSelectedMarkerData} firestoreData={firestoreData} buildingType={buildingType} />;
}
