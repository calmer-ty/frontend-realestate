import { useEffect, useState } from "react";
import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";

import type { IMapsInfoProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

export default function MapsInfo({ buildingType, selectedMarkerData, setSelectedMarkerData, visibleMarkerData, firestoreData }: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);
  const [selectedData, setSelectedData] = useState<IGeocodeData | null>(null);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    setScroll(true);
  }, [selectedMarkerData]);

  // 지도 이동시 탭 스크롤 다운
  useEffect(() => {
    setScroll(false);
    setSelectedData(null);
  }, [visibleMarkerData]);

  const onClickScroll = (): void => {
    setScroll((prev) => !prev);
  };

  // const onClickInfo = (el: IGeocodeData): void => {
  //   setSelectedItem(el); // 선택된 el을 상태에 저장
  // };
  console.log("selectedItem: ", selectedData);
  console.log("selectedMarkerData: ", selectedMarkerData);

  return (
    <>
      <S.TabButton className="tabBtn" type="button" onClick={onClickScroll}>
        <div className="stroke"></div>
        매물 보기
      </S.TabButton>
      <S.Container scroll={scroll}>
        {selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} buildingType={buildingType} firestoreData={firestoreData} />
        ) : (
          <VisibleArea visibleMarkerData={visibleMarkerData} buildingType={buildingType} firestoreData={firestoreData} selectedData={selectedData} setSelectedData={setSelectedData} />
        )}
      </S.Container>
    </>
  );
}
