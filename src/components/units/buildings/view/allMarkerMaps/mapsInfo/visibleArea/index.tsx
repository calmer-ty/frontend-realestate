import { useEffect, useState } from "react";
import { getShortenedCityName } from "@/src/commons/libraries/utils/cityNameShortener";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";

import BuildingInfo from "../buildingInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { IMapMarker } from "@/src/commons/types";
import type { IVisibleAreaProps } from "./types";
import * as S from "./styles";

export default function VisibleArea({ buildingType, firestoreDatas, visibleMarkerDatas }: IVisibleAreaProps): JSX.Element {
  const [select, setSelect] = useState(false);
  const [selectedEl, setSelectedEl] = useState<IMapMarker | null>(null);

  useEffect(() => {
    setSelect(false);
    setSelectedEl(null);
  }, [visibleMarkerDatas]);

  const onClickInfo = (el: IMapMarker): void => {
    setSelect((prev) => !prev);
    setSelectedEl(el); // 선택된 el을 상태에 저장
  };

  return (
    <S.Container>
      {visibleMarkerDatas.length !== 0 ? (
        <S.Visible>
          {!select && (
            <ul>
              {visibleMarkerDatas.map((el, index) => {
                const matchingFirestoreData = firestoreDatas.some((firestoreData) => getShortenedCityName(el.address ?? "값 없음") === firestoreData.address);

                return (
                  <li
                    key={`${el.address}_${index}`}
                    onClick={() => {
                      onClickInfo(el);
                    }}
                  >
                    <h2>
                      매매 {isBillion(el.price ?? NaN)}&nbsp;
                      {isTenMillion(el.price ?? NaN)}원
                    </h2>
                    <p>
                      아파트・{el.buildingName}
                      <br />
                      {el.area}m² {el.floor}층
                    </p>
                    <div>{matchingFirestoreData && <>매물있음</>}</div>
                  </li>
                );
              })}
            </ul>
          )}
          {selectedEl !== null && <BuildingInfo selectedData={selectedEl} firestoreDatas={firestoreDatas} buildingType={buildingType} isSelected={select} />}
        </S.Visible>
      ) : (
        <S.UnVisible>
          <ErrorOutlineIcon fontSize="large" />
          <p>
            조건에 맞는 방이 없습니다.
            <br /> 위치를 조정해보세요.
          </p>
        </S.UnVisible>
      )}
    </S.Container>
  );
}
