import { useEffect, useState } from "react";

import SelectedArea from "./selectedArea";
import VisibleArea from "./visibleArea";

import * as S from "./styles";
import type { Dispatch, SetStateAction } from "react";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IMapsInfoProps {
  selectedMarkerData: IGeocodeData | undefined;
  visibleMarkerData: IGeocodeData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  matchingData: IFirestore[];
  buildingType: string;
}

export default function MapsInfo({ selectedMarkerData, setSelectedMarkerData, visibleMarkerData, ...restProps }: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);
  const [selectedData, setSelectedData] = useState<IGeocodeData | undefined>(undefined);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    if (selectedMarkerData === undefined) {
      setScroll(false);
    } else {
      setScroll(true);
    }
  }, [selectedMarkerData]);

  // 지도 이동시 탭 스크롤 다운
  // useEffect(() => {
  //   setScroll(false);
  //   setSelectedData(null);
  // }, [visibleMarkerData]);

  const onClickScroll = (): void => {
    setScroll((prev) => !prev);
  };

  return (
    <>
      <S.Container scroll={scroll}>
        {selectedMarkerData !== undefined ? (
          <SelectedArea selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} {...restProps} />
        ) : (
          <VisibleArea selectedData={selectedData} setSelectedData={setSelectedData} visibleMarkerData={visibleMarkerData} {...restProps} />
        )}
      </S.Container>

      {/* 모바일 해상도일 때 리스트 여닫이 버튼 */}
      <S.TabButton type="button" onClick={onClickScroll}>
        <div className="stroke"></div>
        <span>매물 정보 {scroll ? "닫기" : "열기"}</span>
      </S.TabButton>
    </>
  );
}
