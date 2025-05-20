import BuildingInfo from "./ui/buildingInfo";
import NoDataMessage from "@/src/components/commons/noDataMessage";

import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import * as S from "./styles";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IVisibleBuildingProps {
  matchingData: IFirestore[];
  visibleMarkerData: IGeocodeData[];
  selectedData: IGeocodeData | undefined;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  buildingType: string;
  mapMode: boolean;
}
interface IListItemProps {
  matchingMarkerData: IGeocodeData[];
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
}

export default function VisibleBuilding({ visibleMarkerData, matchingData, selectedData, setSelectedData, buildingType, mapMode }: IVisibleBuildingProps): JSX.Element {
  // visibleData를 순회하면서 matchingData와 대조하여 동일한 데이터만 걸러냅니다.
  const matchingMarkerData = visibleMarkerData.filter((visibleData) => {
    return matchingData.some((matchingData) => visibleData.geocode?.jibunAddress === matchingData.address || visibleData.geocode?.roadAddress === matchingData.address);
  });

  return (
    <>
      {matchingMarkerData.length !== 0 ? (
        <>
          {/* 지도에 보이는 마커 정보 리스트 */}
          {selectedData !== undefined ? (
            // 마커 리스트 아이템을 선택할 때 보이는 건물 정보
            <BuildingInfo matchingData={matchingData} selectedData={selectedData} buildingType={buildingType} setSelectedData={setSelectedData} mapMode={mapMode} />
          ) : (
            <ListItem matchingMarkerData={matchingMarkerData} setSelectedData={setSelectedData} />
          )}
        </>
      ) : (
        <NoDataMessage>
          <p>조건에 맞는 방이 없습니다.</p>
          <p>위치를 조정해보세요.</p>
        </NoDataMessage>
      )}
    </>
  );
}

function ListItem({ matchingMarkerData, setSelectedData }: IListItemProps): JSX.Element {
  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedData(el); // 선택된 el을 상태에 저장
  };

  return (
    <S.ListItem>
      {matchingMarkerData.map((visData, index) => {
        return (
          <li
            key={`${visData.data?.aptNm}_${index}`}
            onClick={() => {
              onClickInfo(visData);
            }}
          >
            <h3>매매 {formatPrice(Number(visData.data?.dealAmount))}</h3>
            <p>
              {visData.data?.aptNm}
              <br />
              {visData.data?.excluUseAr}m² {visData.data?.floor}층
            </p>
          </li>
        );
      })}
    </S.ListItem>
  );
}
