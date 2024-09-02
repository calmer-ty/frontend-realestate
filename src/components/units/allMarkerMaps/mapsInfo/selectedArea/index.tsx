import BuildingInfo from "../buildingInfo";
import type { ISelectedAreaProps } from "./types";

export default function SelectedArea(props: ISelectedAreaProps): JSX.Element {
  const { buildingType, firebaseDatas, selectedMarkerData } = props;

  return <BuildingInfo selectedData={selectedMarkerData} firebaseDatas={firebaseDatas} buildingType={buildingType} isSelected={true} />;
}
