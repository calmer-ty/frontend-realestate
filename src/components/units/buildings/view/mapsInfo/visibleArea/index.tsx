import NoDataMessage from "@/src/components/commons/noDataMessage";
import BuildingInfo from "../buildingInfo";
import MarkerList from "./markerList";

import * as S from "./styles";

import type { IGeocodeData, IUserInputGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IVisibleAreaProps {
  matchingDatas: IUserInputGeocodeData[];
  visibleMarkerDatas: IGeocodeData[];
  selectedData: IGeocodeData | null;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  const { visibleMarkerDatas, matchingDatas, selectedData, setSelectedData } = props;

  // visibleData를 순회하면서 matchingData와 대조하여 동일한 데이터만 걸러냅니다.
  const matchingMarkerData = visibleMarkerDatas.filter((visibleData) => {
    return matchingDatas.some((matchingData) => visibleData.geocode?.jibunAddress === matchingData.data.address || visibleData.geocode?.roadAddress === matchingData.data.address);
  });

  return (
    <S.Container>
      {matchingMarkerData.length !== 0 ? (
        <>
          {/* 지도에 보이는 마커 정보 리스트 */}
          {selectedData === null ? (
            <MarkerList matchingMarkerData={matchingMarkerData} setSelectedData={setSelectedData} />
          ) : (
            // 마커 리스트 아이템을 선택할 때 보이는 건물 정보
            <BuildingInfo matchingDatas={matchingDatas} selectedData={selectedData} setSelectedData={setSelectedData} />
          )}
        </>
      ) : (
        <NoDataMessage text="조건에 맞는 방이 없습니다. 위치를 조정해보세요." />
      )}
    </S.Container>
  );
}
