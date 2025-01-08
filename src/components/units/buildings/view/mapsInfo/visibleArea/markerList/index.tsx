import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { getJibunAddress } from "@/src/commons/libraries/utils/addressUtils";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IMarkerListProps } from "./types";
import type { IGeocodeData } from "@/src/commons/types";
import * as S from "./styles";

export default function MarkerList(props: IMarkerListProps): JSX.Element {
  const { visibleMarkerData, firestoreData, setSelectedData } = props;
  const onClickInfo = (el: IGeocodeData): void => {
    setSelectedData(el); // 선택된 el을 상태에 저장
  };
  return (
    <>
      <S.List>
        {visibleMarkerData.map((visData, index) => {
          const matchingFirestoreData = firestoreData.some((fireData) => getJibunAddress(visData) === fireData.address);

          return (
            <li
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
              <div>{matchingFirestoreData && <>매물있음</>}</div>
            </li>
          );
        })}
      </S.List>
    </>
  );
}
