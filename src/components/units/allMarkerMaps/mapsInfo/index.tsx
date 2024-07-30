import Link from "next/link";
import Image from "next/image";

import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";

import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import type { IMapsInfoProps } from "./types";
import type { IFirebaseData } from "@/src/types";
import * as S from "./styles";

export default function MapsInfo(props: IMapsInfoProps): JSX.Element {
  const matchedFirebaseData: IFirebaseData[] = props.firebaseDatas.filter(
    (el) => shortenCityName(props.selectedMarkerData?.address ?? "") === el.address || shortenCityName(props.selectedMarkerData?.address_street ?? "") === el.address
  );
  console.log("matchedFirebaseData:::", matchedFirebaseData);
  return (
    <S.Container>
      {/* 클릭 된 건물 상세 정보 */}
      {props.selectedMarkerData !== null ? (
        <S.SelectedArea>
          <S.SelectedInfo>
            <S.InfoWrap>
              <h2>{props.selectedMarkerData.buildingName}</h2>
              <S.TextWrap>
                <ChipSmall label="연식" /> {props.selectedMarkerData.constructionYear}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="지번" /> {props.selectedMarkerData.address}
              </S.TextWrap>
              <S.TextWrap>
                <ChipSmall label="도로명" />
                {props.selectedMarkerData.address_street}
              </S.TextWrap>
            </S.InfoWrap>

            <S.InfoWrap>
              <h3>최근 실거래가</h3>
              <S.SelectedContent>
                <strong>
                  매매 {isBillion(props.selectedMarkerData.price)}&nbsp;
                  {isTenMillion(props.selectedMarkerData.price)}원
                </strong>
                <p>
                  {props.selectedMarkerData.dealYear}.{props.selectedMarkerData.dealMonth}.{props.selectedMarkerData.dealDay}・{props.selectedMarkerData.floor}층・{props.selectedMarkerData.area}m²
                </p>
              </S.SelectedContent>
            </S.InfoWrap>
          </S.SelectedInfo>

          {/* 등록된 건물 정보 */}
          <S.RegisteredInfo>
            {matchedFirebaseData.length > 0 ? (
              <ul>
                {matchedFirebaseData.map((el, index) => (
                  <li key={`${el.type}_${el.address}_${index}`}>
                    <Link href={`/buildings/${el._id}`}>
                      <S.ImgWrap>{el.imageUrls !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} width={0} height={0} alt={el._id} /> : <ImageNotSupportedIcon />}</S.ImgWrap>
                      <p>
                        <strong>
                          매매 {isBillion(el.price)}&nbsp;
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
        </S.SelectedArea>
      ) : (
        <>
          {/* 보여지는 지도 범위의 건물 리스트 */}
          <S.VisibleArea>
            <ul>
              {props.visibleMarkerDatas.map((el, index) => {
                const matchingFirebaseData = props.firebaseDatas.some((firebaseData) => shortenCityName(el.address) === firebaseData.address);

                return (
                  <li key={`${el.address}_${index}`}>
                    <h2>
                      매매 {isBillion(el.price)}&nbsp;
                      {isTenMillion(el.price)}원
                    </h2>
                    <p>
                      아파트・{el.buildingName}
                      <br />
                      {el.area}m² {el.floor}층
                    </p>
                    <div>{matchingFirebaseData && <>매물있음</>}</div>
                  </li>
                );
              })}
            </ul>
          </S.VisibleArea>
        </>
      )}
    </S.Container>
  );
}
