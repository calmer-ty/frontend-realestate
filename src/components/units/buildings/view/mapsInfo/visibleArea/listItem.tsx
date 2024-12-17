import { getReduceCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";

interface IVisibleAreaListItemProps {
  item: IGeocodeData;
  index: number;
  firestoreData: IFirestore[];
  onClickInfo: (el: IGeocodeData) => void;
}

export default function ListItem(props: IVisibleAreaListItemProps): JSX.Element {
  const matchingFirestoreData = props.firestoreData.some((firestoreData) => getReduceCityName(props.item.geocode?.jibunAddress ?? DEFAULT_STRING_VALUE) === firestoreData.address);
  return (
    <li
      onClick={() => {
        props.onClickInfo(props.item);
      }}
    >
      <h2>
        매매 {isBillion(props.item.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}&nbsp;
        {isTenMillion(props.item.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
      </h2>
      <p>
        아파트・{props.item.data?.aptNm}
        <br />
        {props.item.data?.excluUseAr}m² {props.item.data?.floor}층
      </p>
      <div>{matchingFirestoreData && <>매물있음</>}</div>
    </li>
  );
}
