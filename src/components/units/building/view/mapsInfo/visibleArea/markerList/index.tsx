import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import * as S from "./styles";

import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IMarkerListProps {
  matchingMarkerData: IGeocodeData[];
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
}

export default function MarkerList({ matchingMarkerData, setSelectedData }: IMarkerListProps): JSX.Element {
  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedData(el); // 선택된 el을 상태에 저장
  };

  return (
    <>
      <S.List>
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
                아파트・{visData.data?.aptNm}
                <br />
                {visData.data?.excluUseAr}m² {visData.data?.floor}층
              </p>
            </li>
          );
        })}
      </S.List>
    </>
  );
}
