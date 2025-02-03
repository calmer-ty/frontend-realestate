import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import * as S from "./styles";

import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IMarkerListProps {
  matchingMarkerData: IGeocodeData[];
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}

export default function MarkerList(props: IMarkerListProps): JSX.Element {
  const { matchingMarkerData, setSelectedData } = props;
  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedData(el); // 선택된 el을 상태에 저장
  };

  return (
    <>
      <ul>
        {matchingMarkerData.map((visData, index) => {
          return (
            <S.ListItem
              key={`${visData.data?.aptNm}_${index}`}
              onClick={() => {
                onClickInfo(visData);
              }}
            >
              <h2>매매 {formatPrice(Number(visData.data?.dealAmount?.replace(/,/g, "")))}</h2>
              <p>
                아파트・{visData.data?.aptNm}
                <br />
                {visData.data?.excluUseAr}m² {visData.data?.floor}층
              </p>
            </S.ListItem>
          );
        })}
      </ul>
    </>
  );
}
