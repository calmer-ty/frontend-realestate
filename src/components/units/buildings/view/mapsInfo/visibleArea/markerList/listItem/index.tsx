import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import type { IVisibleAreaListItemProps } from "./types";

export default function ListItem(props: IVisibleAreaListItemProps): JSX.Element {
  const matchingFirestoreData = props.firestoreData.some((firestoreData) => getReduceCityName(props.el.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE) === firestoreData.address);
  return (
    <li
      onClick={() => {
        props.onClickInfo(props.el);
      }}
    >
      <h2>
        매매 {isBillion(props.el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
        {isTenMillion(props.el.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
      </h2>
      <p>
        아파트・{props.el.data?.aptNm}
        <br />
        {props.el.data?.excluUseAr}m² {props.el.data?.floor}층
      </p>
      <div>{matchingFirestoreData && <>매물있음</>}</div>
    </li>
  );
}
