import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import BasicChip from "@/src/components/commons/chip/basic";

import * as S from "./styles";

import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
interface IBuildingInfoTopProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | null>>;
}

export default function BuildingInfoTop(props: IBuildingInfoTopProps): JSX.Element {
  const { selectedData, setSelectedData } = props;
  const onClickClose = (): void => {
    setSelectedData(null);
  };

  return (
    <S.Container>
      <S.CloseButton onClick={onClickClose} />
      <S.InfoWrap>
        <h2>{selectedData.data?.aptNm}</h2>
        <S.TextWrap>
          <BasicChip label="연식" size="small" /> <span>{selectedData.data?.buildYear}</span>
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="지번" size="small" /> <span>{selectedData.geocode?.jibunAddress}</span>
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="도로명" size="small" /> <span>{selectedData.geocode?.roadAddress}</span>
        </S.TextWrap>
      </S.InfoWrap>

      <S.InfoWrap>
        <h3>최근 실거래가</h3>
        <S.SelectedContent>
          <strong>매매 {formatPrice(Number(selectedData.data?.dealAmount?.replace(/,/g, "")))}</strong>
          <p>
            {selectedData.data?.dealYear}.{selectedData.data?.dealMonth}.{selectedData.data?.dealDay}・{selectedData.data?.floor}층・{selectedData.data?.excluUseAr}m²
          </p>
        </S.SelectedContent>
      </S.InfoWrap>
    </S.Container>
  );
}
