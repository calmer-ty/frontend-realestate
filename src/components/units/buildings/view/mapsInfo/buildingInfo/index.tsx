import { getFullCityName } from "@/src/commons/libraries/utils/convertCityName";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/priceFormatter";
import { DEFAULT_NUMBER_VALUE, DEFAULT_STRING_VALUE } from "@/src/commons/constants";

import ChipSmall from "@/src/components/commons/dataDisplay/chip/small";
import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import type { IFirestore } from "@/src/commons/types";
import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { selectedData, isSelected, firestoreData, buildingType } = props;

  const address = `${getFullCityName(selectedData.data?.estateAgentSggNm ?? DEFAULT_STRING_VALUE)} ${selectedData.data?.umdNm} ${selectedData.data?.jibun}`;

  const matchedFirestoreData: IFirestore[] = firestoreData.filter(
    (el) => address === el.address
    // || getReducedCityName(selectedData?.address_road ?? DEFAULT_STRING_VALUE) === el.address
  );

  return (
    <>
      {isSelected && selectedData != null && (
        <>
          <S.BuildingInfo>
            <S.InfoWrap>
              <h2>{selectedData.data?.aptNm}</h2>
              <S.TextWrap>
                <ChipSmall label="연식" /> {selectedData.data?.dealYear}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="지번" /> {selectedData.geocode?.jibunAddress}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" /> {selectedData.geocode?.roadAddress}
              </S.TextWrap>
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
          </S.BuildingInfo>

          {/* 등록된 건물 정보 */}
          <S.RegisteredInfo>
            {matchedFirestoreData.length > 0 ? (
              <S.Registered>
                <h3>
                  총 <strong>{matchedFirestoreData.length}</strong>개의 매물이 있습니다
                </h3>
                <ul className="buildingList">
                  {matchedFirestoreData.map((el, index) => (
                    <li key={`${el.type}_${el.address}_${index}`}>
                      <Link href={`/${buildingType}/${el._id}`}>
                        {el.imageUrls?.[0] !== undefined ? (
                          <Image src={el.imageUrls?.[0] ?? DEFAULT_STRING_VALUE} width={80} height={80} alt={el._id ?? DEFAULT_STRING_VALUE} unoptimized />
                        ) : (
                          <BasicUnImage width="80px" height="80px" fontSize="24px" />
                        )}
                        <p>
                          <strong>
                            매매 {isBillion(el.price ?? DEFAULT_NUMBER_VALUE)}
                            {isTenMillion(el.price ?? DEFAULT_NUMBER_VALUE)}원
                          </strong>
                          <br />
                          {el.type}・{el.addressDetail}
                          <br />
                          {el.floor}층, {el.area}m², 관리비 {el.manageCost}만원
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </S.Registered>
            ) : (
              <S.UnRegistered>
                <ErrorOutlineIcon fontSize="large" />
                <p>
                  거래 가능한 매물이 없습니다.
                  <br />
                  다른 건물을 선택해 주세요.
                </p>
              </S.UnRegistered>
            )}
          </S.RegisteredInfo>
        </>
      )}
    </>
  );
}
