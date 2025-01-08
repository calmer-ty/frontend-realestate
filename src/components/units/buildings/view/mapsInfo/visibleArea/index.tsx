import BuildingInfo from "../buildingInfo";
import NoDataMessage from "../noDataMessage";
import MarkerList from "./markerList";

import type { IVisibleAreaProps } from "./types";
import * as S from "./styles";
import { getJibunAddress } from "@/src/commons/libraries/utils/addressUtils";

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  const { visibleMarkerData, firestoreData, buildingType, selectedData, setSelectedData } = props;

  // matchingData 변수 선언
  const matchingData = visibleMarkerData.some((visData) => firestoreData.some((fireData) => getJibunAddress(visData) === fireData.address));
  console.log("matchingData: ", matchingData);
  return (
    <S.Container>
      {visibleMarkerData.length !== 0 ? (
        <>
          {/* 지도에 보이는 마커 정보 리스트 */}
          {selectedData === null ? (
            <MarkerList visibleMarkerData={visibleMarkerData} firestoreData={firestoreData} setSelectedData={setSelectedData} />
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
