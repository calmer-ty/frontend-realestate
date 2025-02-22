import { useState } from "react";

import NoDataMessage from "@/src/components/commons/noDataMessage";
import MatchedList from "./matchedList";
import BasicToggleButton from "@/src/components/commons/button/toggle/basic";

import * as S from "./styles";

import { BUILDING_TYPE } from "@/src/commons/constants";
import type { IFirestore, IGeocodeData } from "@/src/commons/types";
interface IBuildingInfoListingProps {
  selectedData: IGeocodeData;
  matchingData: IFirestore[];
}

export default function BuildingInfoListing({ selectedData, matchingData }: IBuildingInfoListingProps): JSX.Element {
  // 토글 로직 빼옴
  const [alignment, setAlignment] = useState<string | null>("월세");
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null): void => {
    setAlignment(newAlignment);
  };

  // 매칭된 데이터와 파이어베이스에서 값을 대조하여 해당 조건에 맞는 것만 필터링합니다.
  const filteredMatchingData = matchingData.filter((matchingData) => selectedData.geocode?.jibunAddress === matchingData.address || selectedData.geocode?.roadAddress === matchingData.address);

  return (
    <S.Container>
      <div className="topMenu">
        <h3>
          총 <strong>{filteredMatchingData.length}</strong>개의 매물이 있습니다
        </h3>
        <BasicToggleButton options={BUILDING_TYPE} value={alignment} onChange={handleAlignment} />
      </div>
      <div className="bottomContents">
        {filteredMatchingData.length !== 0 ? (
          <MatchedList matchingData={filteredMatchingData} alignment={alignment} />
        ) : (
          <NoDataMessage text="거래 가능한 매물이 없습니다. 다른 건물을 선택해 주세요." />
        )}
      </div>
    </S.Container>
  );
}
