// BuildingDetail.tsx
import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";
import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";
import Link from "next/link";
import Image from "next/image";
import UnImageBasic from "@/src/components/commons/unImages/basic";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { IMarkerData, IFirebaseData } from "@/src/commons/types";
import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo({ selectedEl, firebaseDatas, buildingType, isSelected }: IBuildingInfoProps): JSX.Element {
  const matchedFirebaseData: IFirebaseData[] = firebaseDatas.filter(
    (el) => shortenCityName(selectedEl?.address ?? "") === el.address || shortenCityName(selectedEl?.address_road ?? "") === el.address
  );

  return (
    <>
      {isSelected && selectedEl && (
        <>
          <S.BuildingInfo>
            <S.InfoWrap>
              <h2>{selectedEl.buildingName}</h2>
              <S.TextWrap>
                <ChipSmall label="연식" /> {selectedEl.constructionYear}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="지번" /> {selectedEl.address}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" />
                {selectedEl.address_road}
              </S.TextWrap>
            </S.InfoWrap>

            <S.InfoWrap>
              <h3>최근 실거래가</h3>
              <S.SelectedContent>
                <strong>
                  매매 {isBillion(selectedEl.price)}&nbsp;
                  {isTenMillion(selectedEl.price)}원
                </strong>
                <p>
                  {selectedEl.dealYear}.{selectedEl.dealMonth}.{selectedEl.dealDay}・{selectedEl.floor}층・{selectedEl.area}m²
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
