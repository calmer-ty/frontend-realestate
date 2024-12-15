import BuildingInfo from "../buildingInfo";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { useEffect, useState } from "react";
import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import type { IVisibleAreaProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";

import * as S from "./styles";

export default function VisibleArea({ buildingType, firestoreData, visibleMarkerData }: IVisibleAreaProps): JSX.Element {
  const [select, setSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IGeocodeData | null>(null);

  useEffect(() => {
    setSelect(false);
    setSelectedItem(null);
  }, [visibleMarkerData]);

  const onClickInfo = (el: IGeocodeData): void => {
    setSelect((prev) => !prev);
    setSelectedItem(el); // 선택된 el을 상태에 저장
  };

  return (
    <S.Container>
      {visibleMarkerData.length !== 0 ? (
        <S.Visible>
          {!select && (
            <ul>
              {visibleMarkerData.map((item, index) => {
                const matchingFirestoreData = firestoreData.some((firestoreData) => getReduceCityName(item.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE) === firestoreData.address);

                return (
                  <li
                    key={`${item.data?.aptNm}_${index}`}
                    onClick={() => {
                      onClickInfo(item);
                    }}
                  >
                    <h2>
                      매매 {isBillion(item.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
                      {isTenMillion(item.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
                    </h2>
                    <p>
                      아파트・{item.data?.aptNm}
                      <br />
                      {item.data?.excluUseAr}m² {item.data?.floor}층
                    </p>
                    <div>{matchingFirestoreData && <>매물있음</>}</div>
                  </li>
                );
              })}
            </ul>
          )}
          {selectedItem !== null && <BuildingInfo selectedData={selectedItem} firestoreData={firestoreData} buildingType={buildingType} isSelected={select} />}
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
