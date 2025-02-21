import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";

import BasicChip from "@/src/components/commons/chip/basic";

import * as S from "./styles";

import type { IGeocodeData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";
import { DEFAULT_STRING_VALUE } from "@/src/commons/constants";
import CloseButton from "@/src/components/commons/button/close";
interface IBuildingInfoTopProps {
  selectedData: IGeocodeData;
  setSelectedData: Dispatch<SetStateAction<IGeocodeData | undefined>>;
  buildingType: string;
}

export default function BuildingInfoTop({ selectedData, setSelectedData, buildingType }: IBuildingInfoTopProps): JSX.Element {
  const onClickClose = (): void => {
    setSelectedData(undefined);
  };

  const buildingName =
    buildingType === "apartment"
      ? selectedData.data?.aptNm
      : buildingType === "officetel"
      ? selectedData.data?.offiNm
      : buildingType === "familyHousing"
      ? selectedData.data?.mhouseNm
      : DEFAULT_STRING_VALUE;

  return (
    <S.Container>
      <CloseButton onClickClose={onClickClose} />
      <S.InfoWrap>
        <h2>{buildingName}</h2>
        <S.TextWrap>
          <BasicChip label="연식" size="medium" /> <span>{selectedData.data?.buildYear}</span>
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="지번" size="medium" /> <span>{selectedData.geocode?.jibunAddress}</span>
        </S.TextWrap>
        <S.TextWrap>
          <BasicChip label="도로명" size="medium" /> <span>{selectedData.geocode?.roadAddress}</span>
        </S.TextWrap>
      </S.InfoWrap>

      <S.InfoWrap>
        <h3>최근 실거래가</h3>
        <S.SelectedContent>
          <strong>매매 {formatPrice(Number(selectedData.data?.dealAmount))}</strong>
          <p>
            {selectedData.data?.dealYear}.{selectedData.data?.dealMonth}.{selectedData.data?.dealDay}・{selectedData.data?.floor}층・{selectedData.data?.excluUseAr}m²
          </p>
        </S.SelectedContent>
      </S.InfoWrap>
    </S.Container>
  );
}
