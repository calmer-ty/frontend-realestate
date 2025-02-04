import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";

import UnderlineTitle from "@/src/components/commons/title/underline";

import type { IBuildingDetailProps } from "../types";
import * as S from "./styles";

export default function BuildingDetailBottom({ buildingData }: IBuildingDetailProps): JSX.Element {
  return (
    <S.Container>
      <S.InfoItem>
        <UnderlineTitle label="주소 정보" />
        <S.InfoList>
          <li>
            <h3>지번 주소</h3>
            <span>{buildingData.address}</span>
          </li>
          <li>
            <h3>건물명</h3>
            <span>{buildingData.addressDetail}</span>
          </li>
        </S.InfoList>
      </S.InfoItem>
      <S.InfoItem>
        <UnderlineTitle label="가격 정보" />
        <S.InfoList>
          <li>
            <h3>매물 가격</h3>
            <span>{getTransactionText(buildingData.transactionType, buildingData.price, buildingData.rent)}</span>
          </li>
          <li>
            <h3>관리비</h3>
            <span>매 월 {formatPrice(buildingData.manageCost)}</span>
          </li>
        </S.InfoList>
      </S.InfoItem>

      <S.InfoItem>
        <UnderlineTitle label="상세 정보" />
        <S.InfoList>
          <li>
            <h3>건물 형태</h3>
            <span>{buildingData.buildingType}</span>
          </li>
          <li>
            <h3>건물 이름</h3>
            <span>{buildingData.addressDetail}</span>
          </li>
          <li>
            <h3>해당 층</h3>
            <span>{buildingData.floor} 층</span>
          </li>
          <li>
            <h3>방 개수</h3>
            <span>{buildingData.roomCount} 개</span>
          </li>
          <li>
            <h3>면적</h3>
            <span>{buildingData.area} ㎡</span>
          </li>
          <li>
            <h3>화장실 개수</h3>
            <span>{buildingData.bathroomCount} 개</span>
          </li>
        </S.InfoList>
      </S.InfoItem>

      <S.InfoItem>
        <UnderlineTitle label="매물 설명" />
        {buildingData.desc ?? "설명이 없습니다."}
      </S.InfoItem>
    </S.Container>
  );
}
