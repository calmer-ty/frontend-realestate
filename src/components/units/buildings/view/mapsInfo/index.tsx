import { useEffect, useState } from "react";

import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IMapsInfoProps {
  selectedMarkerData: IGeocodeData | null;
  visibleMarkerData: IGeocodeData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  firestoreData: IFirestore[];
  buildingType: string;
}

export default function MapsInfo({ selectedMarkerData, setSelectedMarkerData, visibleMarkerData, firestoreData, buildingType }: IMapsInfoProps): JSX.Element {
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

  return (
    <>
      <S.Container scroll={scroll}>
        {selectedMarkerData !== null ? (
          <SelectedArea selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} buildingType={buildingType} firestoreData={firestoreData} />
        ) : (
          <VisibleArea visibleMarkerData={visibleMarkerData} buildingType={buildingType} firestoreData={firestoreData} selectedData={selectedData} setSelectedData={setSelectedData} />
        )}
      </S.Container>
      {/* 모바일 해상도일 때 리스트 여닫이 버튼 */}
      <S.TabButton className="tabBtn" type="button" onClick={onClickScroll}>
        <div className="stroke"></div>
        매물 보기
      </S.TabButton>
    </>
  );
}
