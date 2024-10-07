import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";
import ChipSmall from "@/src/components/commons/dataDisplay/chip/small";
import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImages/basic";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { IFirestoreData } from "@/src/commons/types";
import type { IBuildingInfoProps } from "./types";
import * as S from "./styles";

export default function BuildingInfo(props: IBuildingInfoProps): JSX.Element {
  const matchedFirestoreData: IFirestoreData[] = props.firestoreDatas.filter(
    (el) => shortenCityName(props.selectedData?.address ?? "값 없음") === el.address || shortenCityName(props.selectedData?.address_road ?? "값 없음") === el.address
  );

  return (
    <>
      {props.isSelected && props.selectedData != null && (
        <>
          <S.BuildingInfo>
            <S.InfoWrap>
              <h2>{props.selectedData.buildingName}</h2>
              <S.TextWrap>
                <ChipSmall label="연식" /> {props.selectedData.constructionYear}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="지번" /> {props.selectedData.address}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" />
                {props.selectedData.address_road}
              </S.TextWrap>
            </S.InfoWrap>

            <S.InfoWrap>
              <h3>최근 실거래가</h3>
              <S.SelectedContent>
                <strong>
                  매매 {isBillion(props.selectedData.price ?? NaN)}&nbsp;
                  {isTenMillion(props.selectedData.price ?? NaN)}원
                </strong>
                <p>
                  {props.selectedData.dealYear}.{props.selectedData.dealMonth}.{props.selectedData.dealDay}・{props.selectedData.floor}층・{props.selectedData.area}m²
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
                      <Link href={`/${props.buildingType}/${el._id}`}>
                        {el.imageUrls?.[0] !== undefined ? (
                          <Image src={el.imageUrls?.[0] ?? "값 없음"} width={80} height={80} alt={el._id} />
                        ) : (
                          <BasicUnImage width="80px" height="80px" fontSize="24px" />
                        )}
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
