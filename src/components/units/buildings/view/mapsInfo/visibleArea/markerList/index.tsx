import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IMarkerListProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

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
              <h2>
                매매 {isBillion(visData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
                {isTenMillion(visData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
              </h2>
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
