import BuildingInfo from "../buildingInfo";
import type { ISelectedAreaProps } from "./types";

export default function SelectedArea(props: ISelectedAreaProps): JSX.Element {
  return <BuildingInfo selectedData={props.selectedMarkerData} firebaseDatas={props.firebaseDatas} buildingType={props.buildingType} isSelected={true} />;
}
