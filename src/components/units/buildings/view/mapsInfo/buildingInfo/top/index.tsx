import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";

import BasicChip from "@/src/components/commons/chip/basic";

import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import type { IBuildingInfoTopProps } from "./types";
import * as S from "./styles";

export default function BuildingInfoTop(props: IBuildingInfoTopProps): JSX.Element {
  const { selectedData, setSelectedData } = props;
  const onClickClose = (): void => {
    setSelectedData(null);
  };
  console.log("selectedData: ", selectedData.data?.umdNm);
  const jibunAddress = `${getFullCityName(selectedData.data?.estateAgentSggNm ?? DEFAULT_STRING_VALUE)} ${selectedData.data?.umdNm ?? DEFAULT_STRING_VALUE} ${
    selectedData.data?.jibun ?? DEFAULT_STRING_VALUE
  }`;
  return (
    <S.Container>
      <S.CloseButton onClick={onClickClose} />
      <S.InfoWrap>
        <h2>{selectedData.data?.aptNm}</h2>
        <S.TextWrap>
          <BasicChip label="연식" size="small" /> <span>{selectedData.data?.dealYear}</span>
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="지번" size="small" /> <span>{jibunAddress}</span>
        </S.TextWrap>
        {/* <S.TextWrap>
          <BasicChip label="도로명" size="small" /> <span>{props.selectedData.geocode?.roadAddress}</span>
        </S.TextWrap> */}
      </S.InfoWrap>

      <S.InfoWrap>
        <h3>최근 실거래가</h3>
        <S.SelectedContent>
          <strong>
            매매 {isBillion(selectedData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}
            &nbsp;{isTenMillion(selectedData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
          </strong>
          <p>
            {selectedData.data?.dealYear}.{selectedData.data?.dealMonth}.{selectedData.data?.dealDay}・{selectedData.data?.floor}층・{selectedData.data?.excluUseAr}m²
          </p>
        </S.SelectedContent>
      </S.InfoWrap>
    </S.Container>
  );
}
