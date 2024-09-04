import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";
import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";
import Link from "next/link";
import Image from "next/image";
import UnImageBasic from "@/src/components/commons/unImages/basic";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { IFirebaseData } from "@/src/commons/types";
import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const { selectedData, firebaseDatas, buildingType, isSelected } = props;
  const matchedFirebaseData: IFirebaseData[] = firebaseDatas.filter(
    (el) => shortenCityName(selectedData?.address ?? "") === el.address || shortenCityName(selectedData?.address_road ?? "") === el.address
  );

  return (
    <>
      {isSelected && selectedData != null && (
        <>
          <S.BuildingInfo>
            <S.InfoWrap>
              <h2>{selectedData.buildingName}</h2>
              <S.TextWrap>
                <ChipSmall label="연식" /> {selectedData.constructionYear}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="지번" /> {selectedData.address}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" />
                {selectedData.address_road}
              </S.TextWrap>
            </S.InfoWrap>

            <S.InfoWrap>
              <h3>최근 실거래가</h3>
              <S.SelectedContent>
                <strong>
                  매매 {isBillion(selectedData.price)}&nbsp;
                  {isTenMillion(selectedData.price)}원
                </strong>
                <p>
                  {selectedData.dealYear}.{selectedData.dealMonth}.{selectedData.dealDay}・{selectedData.floor}층・{selectedData.area}m²
                </p>
              </S.SelectedContent>
            </S.InfoWrap>
          </S.BuildingInfo>

          {/* 등록된 건물 정보 */}
          <S.RegisteredInfo>
            {matchedFirebaseData.length > 0 ? (
              <S.Registered>
                <h3>
                  총 <strong>{matchedFirebaseData.length}</strong>개의 매물이 있습니다
                </h3>
                <ul className="buildingList">
                  {matchedFirebaseData.map((el, index) => (
                    <li key={`${el.type}_${el.address}_${index}`}>
                      <Link href={`/${buildingType}/${el._id}`}>
                        {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} width={80} height={80} alt={el._id} /> : <UnImageBasic width="80px" height="80px" fontSize="24px" />}
                        <p>
                          <strong>
                            매매 {isBillion(el.price)}
                            {isTenMillion(el.price)}원
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
