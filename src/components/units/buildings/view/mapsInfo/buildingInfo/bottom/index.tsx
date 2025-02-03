import MatchedList from "./matchedList";
import NoDataMessage from "@/src/components/commons/noDataMessage";

import * as S from "./styles";

import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoBottomProps {
  selectedData: IGeocodeData;
  matchingDatas: IFirestore[];
}

export default function BuildingInfoBottom(props: IBuildingInfoBottomProps): JSX.Element {
  const { selectedData, matchingDatas } = props;

  // 매칭된 데이터와 파이어베이스에서 값을 대조하여 해당 조건에 맞는 것만 필터링합니다.
  const matchedDatas = matchingDatas.filter((matchingData) => selectedData.geocode?.jibunAddress === matchingData.address || selectedData.geocode?.roadAddress === matchingData.address);

  return (
    <S.Container>
      {matchedDatas.length !== 0 ? (
        <S.Registered>
          <h3>
            총 <strong>{matchedDatas.length}</strong>개의 매물이 있습니다
          </h3>
          <MatchedList matchedDatas={matchedDatas} />
        </S.Registered>
      ) : (
        <NoDataMessage text="거래 가능한 매물이 없습니다. 다른 건물을 선택해 주세요." />
      )}
    </S.Container>
  );
}
