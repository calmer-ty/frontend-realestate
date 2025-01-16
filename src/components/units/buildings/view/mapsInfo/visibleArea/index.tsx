import NoDataMessage from "@/src/components/commons/noDataMessage";
import BuildingInfo from "../buildingInfo";
import MarkerList from "./markerList";

import * as S from "./styles";

import type { IGeocodeData, IFirestore } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IVisibleAreaProps {
  buildingType: string;
  firestoreData: IFirestore[];
  visibleMarkerData: IGeocodeData[];
  selectedData: IGeocodeData | null;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  const { visibleMarkerData, firestoreData, buildingType, selectedData, setSelectedData } = props;

  const matchingMarkerData = visibleMarkerData.filter((visData) => {
    const match = firestoreData.some((fireData) => {
      const isMatch = visData.geocode?.jibunAddress === fireData.address || visData.geocode?.roadAddress === fireData.address;
      return isMatch;
    });
    return match;
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
            <BuildingInfo selectedData={selectedData} setSelectedData={setSelectedData} firestoreData={firestoreData} buildingType={buildingType} />
          )}
        </>
      ) : (
        <NoDataMessage text="조건에 맞는 방이 없습니다. 위치를 조정해보세요." />
      )}
    </S.Container>
  );
}
