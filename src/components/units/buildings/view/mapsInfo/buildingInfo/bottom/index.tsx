import MatchedList from "./matchedList";
import NoDataMessage from "../../noDataMessage";

import * as S from "./styles";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoBottomProps {
  selectedData: IGeocodeData;
  firestoreData: IFirestore[];
  buildingType: string;
}

export default function BuildingInfoBottom(props: IBuildingInfoBottomProps): JSX.Element {
  const { buildingType, firestoreData, selectedData } = props;

  const matchedData = firestoreData.filter((el) => selectedData.geocode?.jibunAddress === el.address || selectedData.geocode?.roadAddress === el.address);
  return (
    <S.Container>
      {matchedData.length > 0 ? (
        <S.Registered>
          <h3>
            총 <strong>{matchedData.length}</strong>개의 매물이 있습니다
          </h3>
          <MatchedList matchedData={matchedData} buildingType={buildingType} />
        </S.Registered>
      ) : (
        <NoDataMessage text="거래 가능한 매물이 없습니다. 다른 건물을 선택해 주세요." />
      )}
    </S.Container>
  );
}
