import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import BasicChip from "@/src/components/commons/chip/basic";

import type { IBuildingInfoTopProps } from "./types";
import * as S from "./styles";

export default function BuildingInfoTop(props: IBuildingInfoTopProps): JSX.Element {
  const selectClose = (): void => {
    props.setSelectedItem(null);
  };
  return (
    <S.Container>
      <S.CloseButton onClick={selectClose} />
      <S.InfoWrap>
        <h2>{props.selectedData.data?.aptNm}</h2>
        <S.TextWrap>
          <BasicChip label="연식" size="small" /> {props.selectedData.data?.dealYear}
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="지번" size="small" /> {props.selectedData.geocode?.jibunAddress}
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="도로명" size="small" /> {props.selectedData.geocode?.roadAddress}
        </S.TextWrap>
      </S.InfoWrap>

      <S.InfoWrap>
        <h3>최근 실거래가</h3>
        <S.SelectedContent>
          <strong>
            매매 {isBillion(props.selectedData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}
            &nbsp;{isTenMillion(props.selectedData.data?.dealAmount?.replace(/,/g, "") ?? DEFAULT_STRING_VALUE)}원
          </strong>
          <p>
            {props.selectedData.data?.dealYear}.{props.selectedData.data?.dealMonth}.{props.selectedData.data?.dealDay}・{props.selectedData.data?.floor}층・{props.selectedData.data?.excluUseAr}m²
          </p>
        </S.SelectedContent>
      </S.InfoWrap>
    </S.Container>
  );
}
