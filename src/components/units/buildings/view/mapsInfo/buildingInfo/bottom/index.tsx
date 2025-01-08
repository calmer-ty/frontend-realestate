import { getJibunAddress } from "@/src/commons/libraries/utils/addressUtils";

import MatchedList from "./matchedList";
import NoDataMessage from "../../noDataMessage";

import type { IBuildingInfoBottomProps } from "./types";
import * as S from "./styles";

export default function BuildingInfoBottom(props: IBuildingInfoBottomProps): JSX.Element {
  const jibunAddress = getJibunAddress(props.selectedData);

  const matchedData = props.firestoreData.filter((el) => jibunAddress === el.address);
  return (
    <S.Container>
      {matchedData.length > 0 ? (
        <S.Registered>
          <h3>
            총 <strong>{matchedData.length}</strong>개의 매물이 있습니다
          </h3>
          <MatchedList matchedData={matchedData} buildingType={props.buildingType} />
        </S.Registered>
      ) : (
        <NoDataMessage text="거래 가능한 매물이 없습니다. 다른 건물을 선택해 주세요." />
      )}
    </S.Container>
  );
}
