import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";

import type { IVisibleAreaProps } from "./types";
import * as S from "./styles";

export default function VisibleArea(props: IVisibleAreaProps): JSX.Element {
  return (
    <S.VisibleArea>
      <ul>
        {props.visibleMarkerDatas.map((el, index) => {
          const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

          return (
            <li key={`${el.address}_${index}`}>
              <h2>
                매매 {isBillion(el.price)}&nbsp;
                {isTenMillion(el.price)}원
              </h2>
              <p>
                아파트・{el.buildingName}
                <br />
                {el.area}m² {el.floor}층
              </p>
              <div>{matchingFirebaseData && <>매물있음</>}</div>
            </li>
          );
        })}
      </ul>
    </S.VisibleArea>
  );
}
