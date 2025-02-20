import NoDataMessage from "@/src/components/commons/noDataMessage";
import BuildingInfo from "../buildingInfo";
import MarkerList from "./markerList";

import * as S from "./styles";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IVisibleAreaProps {
  matchingData: IFirestore[];
  visibleMarkerDatas: IGeocodeData[];
  selectedData: IGeocodeData | undefined;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  buildingType: string;
}

export default function VisibleArea({ visibleMarkerDatas, matchingData, selectedData, setSelectedData, buildingType }: IVisibleAreaProps): JSX.Element {
  // visibleData를 순회하면서 matchingData와 대조하여 동일한 데이터만 걸러냅니다.
  const matchingMarkerData = visibleMarkerDatas.filter((visibleData) => {
    return matchingData.some((matchingData) => visibleData.geocode?.jibunAddress === matchingData.address || visibleData.geocode?.roadAddress === matchingData.address);
  });

  return (
    <S.Container>
      {matchingMarkerData.length !== 0 ? (
        <>
          {/* 지도에 보이는 마커 정보 리스트 */}
          {selectedData !== undefined ? (
            // 마커 리스트 아이템을 선택할 때 보이는 건물 정보
            <BuildingInfo matchingData={matchingData} selectedData={selectedData} buildingType={buildingType} setSelectedData={setSelectedData} />
          ) : (
            <MarkerList matchingMarkerData={matchingMarkerData} setSelectedData={setSelectedData} />
          )}
        </>
      ) : (
        <NoDataMessage text="조건에 맞는 방이 없습니다. 위치를 조정해보세요." />
      )}
    </S.Container>
  );
}
