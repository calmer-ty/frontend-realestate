import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";

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
    <S.List>
      {visibleMarkerData.map((el, index) => {
        const matchingFirestoreData = firestoreData.some((firestoreData) => getReduceCityName(el.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE) === firestoreData.address);

        return (
          <li
            key={`${el.data?.aptNm}_${index}`}
            onClick={() => {
              onClickInfo(el);
            }}
          >
            <h2>
              매매 {isBillion(el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
              {isTenMillion(el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
            </h2>
            <p>
              아파트・{el.data?.aptNm}
              <br />
              {el.data?.excluUseAr}m² {el.data?.floor}층
            </p>
            <div>{matchingFirestoreData && <>매물있음</>}</div>
          </li>
        );
      })}
    </S.List>
  );
}
