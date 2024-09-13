import { useEffect, useState } from "react";
import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";
import type { IMapsInfoProps } from "./types";
import * as S from "./styles";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    setScroll(true);
  }, [props.selectedMarkerData]);

  // 지도 이동시 탭 스크롤 다운
  useEffect(() => {
    setScroll(false);
  }, [props.visibleMarkerDatas]);

  const onClickScroll = (): void => {
    setScroll((prev) => !prev);
  };

  return (
    <>
      <S.TabButton className="tabBtn" type="button" onClick={onClickScroll}>
        <div className="stroke"></div>
        매물 보기
      </S.TabButton>
      <S.Container scroll={scroll}>
        {props.selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={props.selectedMarkerData} buildingType={props.buildingType} firebaseDatas={props.firebaseDatas} />
        ) : (
          <VisibleArea visibleMarkerDatas={props.visibleMarkerDatas} buildingType={props.buildingType} firebaseDatas={props.firebaseDatas} />
        )}
      </S.Container>
    </>
  );
}
