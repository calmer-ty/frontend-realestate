import { useState } from "react";
import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";
import type { IMapsInfoProps } from "./types";
import * as S from "./styles";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);

  const onClickScroll = (): void => {
    setScroll((prev) => !prev);
  };
  return (
    <>
      <S.TabButton className="tabBtn" type="button" onClick={onClickScroll}>
        <div className="stroke"></div>
        매물 탭
      </S.TabButton>
      <S.Container scroll={scroll}>
        {props.selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={props.selectedMarkerData} buildingType={props.buildingType} firebaseDatas={props.firebaseDatas} />
        ) : (
          <VisibleArea visibleMarkerDatas={props.visibleMarkerDatas} firebaseDatas={props.firebaseDatas} />
        )}
      </S.Container>
    </>
  );
}
