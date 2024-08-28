import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";
import type { IMapsInfoProps } from "./types";
import * as S from "./styles";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  return (
    <S.Container>
      {props.selectedMarkerData !== null ? (
        <SelectedArea selectedMarkerData={props.selectedMarkerData} buildingType={props.buildingType} firebaseDatas={props.firebaseDatas} />
      ) : (
        <VisibleArea visibleMarkerDatas={props.visibleMarkerDatas} firebaseDatas={props.firebaseDatas} />
      )}
    </S.Container>
  );
}
