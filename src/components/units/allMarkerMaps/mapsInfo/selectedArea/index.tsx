import Link from "next/link";
import Image from "next/image";

import { isBillion, isTenMillion, shortenCityName } from "@/src/commons/libraries/utils/regex";

import ChipSmall from "@/src/components/commons/dataDisplays/chip/small";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import type { ISelectedAreaProps } from "./types";
import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";

export default function SelectedArea(props: ISelectedAreaProps): JSX.Element {
  const matchedFirebaseData: IFirebaseData[] = props.firebaseDatas.filter(
    (el) => shortenCityName(props.selectedMarkerData?.address ?? "") === el.address || shortenCityName(props.selectedMarkerData?.address_street ?? "") === el.address
  );
  return (
    <S.SelectedArea>
      <S.BuildingInfo>
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
      </S.BuildingInfo>

      {/* 등록된 건물 정보 */}
      <S.RegisteredInfo>
        {matchedFirebaseData.length > 0 ? (
          <S.Registered>
            <p>
              총 <strong>{matchedFirebaseData.length}</strong>개의 매물이 있습니다
            </p>
            <ul>
              {matchedFirebaseData.map((el, index) => (
                <li key={`${el.type}_${el.address}_${index}`}>
                  <Link href={`/buildings/${props.buildingType}/${el._id}`}>
                    <S.ImgWrap>{el.imageUrls !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} layout="fill" alt={el._id} /> : <ImageNotSupportedIcon />}</S.ImgWrap>
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
    </S.SelectedArea>
  );
}
