import MatchedList from "./matchedList";
import NoDataMessage from "@/src/components/commons/noDataMessage";

import * as S from "./styles";

import type { IGeocodeData, IUserInputGeocodeData } from "@/src/commons/types";
interface IBuildingInfoBottomProps {
  selectedData: IGeocodeData;
  matchingDatas: IUserInputGeocodeData[];
}

export default function BuildingInfoBottom(props: IBuildingInfoBottomProps): JSX.Element {
  const { selectedData, matchingDatas } = props;

  console.log("matchingDatas: ", matchingDatas);
  console.log("selectedData: ", selectedData);

  const matchedDatas = matchingDatas.filter((el) => selectedData.geocode?.jibunAddress === el.data.address || selectedData.geocode?.roadAddress === el.data.address);
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
