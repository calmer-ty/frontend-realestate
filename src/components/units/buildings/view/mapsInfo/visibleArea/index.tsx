import { useEffect, useState } from "react";

import BuildingInfo from "../buildingInfo";
import NoDataMessage from "../noDataMessage";
import MarkerList from "./markerList";

import type { IVisibleAreaProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

export default function VisibleArea({ buildingType, firestoreData, visibleMarkerData }: IVisibleAreaProps): JSX.Element {
  const [selectedItem, setSelectedItem] = useState<IGeocodeData | null>(null);

  useEffect(() => {
    setSelectedItem(null);
  }, [visibleMarkerData]);

  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedItem(el); // 선택된 el을 상태에 저장
  };

  return (
    <S.Container>
      {visibleMarkerData.length !== 0 ? (
        <section>
          {/* 지도에 보이는 마커정보 리스트 */}
          {selectedItem === null && <MarkerList visibleMarkerData={visibleMarkerData} firestoreData={firestoreData} onClickInfo={onClickInfo} />}
          {/* 마커 리스트 아이템을 선택할 때 보이는 건물 정보 */}
          {selectedItem !== null && <BuildingInfo selectedData={selectedItem} setSelectedItem={setSelectedItem} firestoreData={firestoreData} buildingType={buildingType} />}
        </section>
      ) : (
        <NoDataMessage text="조건에 맞는 방이 없습니다. 위치를 조정해보세요." />
      )}
    </S.Container>
  );
}
