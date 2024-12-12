import { useEffect, useState } from "react";
import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";
import type { IMapsInfoProps } from "./types";
import * as S from "./styles";

export default function MapsInfo({ buildingType, selectedMarkerData, visibleMarkerData, firestoreData }: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    setScroll(true);
  }, [selectedMarkerData]);

  // 지도 이동시 탭 스크롤 다운
  useEffect(() => {
    setScroll(false);
  }, [visibleMarkerData]);

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
        {selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={selectedMarkerData} buildingType={buildingType} firestoreData={firestoreData} />
        ) : (
          <VisibleArea visibleMarkerData={visibleMarkerData} buildingType={buildingType} firestoreData={firestoreData} />
        )}
      </S.Container>
    </>
  );
}
