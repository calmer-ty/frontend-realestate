"use client";

import Head from "next/head";
import Image from "next/image";

import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";

import TitleUnderline from "@/src/components/commons/titles/underline";

import type { IFirebaseData } from "@/src/types";
import * as S from "./styles";

interface IBuildingDetailProps {
  apartment: IFirebaseData;
}

export default function BuildingDetail({ apartment }: IBuildingDetailProps): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content={apartment.type} />
        <meta property="og:description" content={`${apartment.address}_${apartment.addressDetail}`} />
        <meta property="og:image" content={apartment.imageUrls?.[0]} />
      </Head>
      <S.Container>
        <S.ImgContainer>
          <S.ImgWrap>
            {apartment.imageUrls?.map((el, index) => {
              return <Image key={`${el}_${index}`} src={apartment.imageUrls?.[index] ?? ""} width={0} height={0} alt={apartment.address} layout="fill" />;
            })}
          </S.ImgWrap>
        </S.ImgContainer>
        <S.BuildingInfo>
          <S.InfoItem>
            <TitleUnderline label="가격 정보" />
            <S.InfoContent>
              <li>
                <h3>매물 가격</h3>
                {isBillion(apartment.price)}&nbsp;
                {isTenMillion(apartment.price)} 원
              </li>
              <li>
                <h3>관리비</h3>
                <span>매월 {apartment.manageCost}만 원</span>
              </li>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <TitleUnderline label="상세 정보" />
            <S.InfoContent>
              <li>
                <h3>건물 이름</h3>
                <span>{apartment.addressDetail}</span>
              </li>
              <li>
                <h3>해당 층</h3>
                <span>{apartment.floor}</span>
              </li>
              <li>
                <h3>방 개수</h3>
                <span>{apartment.roomCount}</span>
              </li>
              <li>
                <h3>면적</h3>
                <span>{apartment.area}</span>
              </li>
            </S.InfoContent>
          </S.InfoItem>
        </S.BuildingInfo>
      </S.Container>
    </>
  );
}
