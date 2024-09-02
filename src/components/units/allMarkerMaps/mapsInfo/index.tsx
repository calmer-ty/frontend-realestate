import { useEffect, useState } from "react";
import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";
import type { IMapsInfoProps } from "./types";
import * as S from "./styles";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  const { selectedMarkerData, visibleMarkerDatas, buildingType, firebaseDatas } = props;
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    setScroll(true);
  }, [selectedMarkerData]);

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
        {selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={selectedMarkerData} buildingType={buildingType} firebaseDatas={firebaseDatas} />
        ) : (
          <VisibleArea visibleMarkerDatas={visibleMarkerDatas} buildingType={buildingType} firebaseDatas={firebaseDatas} />
        )}
      </S.Container>
    </>
  );
}
