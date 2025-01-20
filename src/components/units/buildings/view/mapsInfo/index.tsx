import { useEffect, useState } from "react";

import SelectedArea from "./selectedArea";

import * as S from "./styles";

import type { Dispatch, SetStateAction } from "react";
import type { IGeocodeData, IUserInputGeocodeData } from "@/src/commons/types";
interface IMapsInfoProps {
  selectedMarkerData: IGeocodeData | null;
  visibleMarkerDatas: IGeocodeData[];
  setSelectedMarkerData: Dispatch<SetStateAction<IGeocodeData | null>>;
  matchingDatas: IUserInputGeocodeData[];
  buildingType: string;
}

export default function MapsInfo({ selectedMarkerData, setSelectedMarkerData, visibleMarkerDatas, matchingDatas }: IMapsInfoProps): JSX.Element {
  const [scroll, setScroll] = useState(false);

  // 마커 선택시 탭 스크롤 업
  useEffect(() => {
    setScroll(true);
  }, [selectedMarkerData]);

  // 지도 이동시 탭 스크롤 다운
  useEffect(() => {
    setScroll(false);
    // setSelectedData(null);
  }, [visibleMarkerDatas]);

  // const onClickScroll = (): void => {
  //   setScroll((prev) => !prev);
  // };

  return (
    <>
      <S.Container scroll={scroll}>
        {selectedMarkerData !== null && <SelectedArea selectedMarkerData={selectedMarkerData} setSelectedMarkerData={setSelectedMarkerData} matchingDatas={matchingDatas} />}
      </S.Container>
    </>
  );
}
