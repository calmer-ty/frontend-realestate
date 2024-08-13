"use client";

import Head from "next/head";
import Image from "next/image";

import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";

import TitleUnderline from "@/src/components/commons/titles/underline";
import UnImageBasic from "@/src/components/commons/unImages/basic";

import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";

interface IBuildingDetailProps {
  buildingType: IFirebaseData;
}

export default function BuildingDetail({ buildingType }: IBuildingDetailProps): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content={buildingType.type} />
        <meta property="og:description" content={`${buildingType.address}_${buildingType.addressDetail}`} />
        <meta property="og:image" content={buildingType.imageUrls?.[0]} />
      </Head>
      <S.Container>
        <S.ImgContainer>
          <S.ImgWrap>
            {[...Array(5)].map((_, index) => {
              const el = buildingType.imageUrls?.[index];
              return el !== undefined ? (
                <Image key={`${el}_${index}`} src={el} width={0} height={0} alt={buildingType.address ?? "No address available"} layout="fill" />
              ) : (
                <UnImageBasic width="100%" height="100%" fontSize="36px" />
              );
            })}
            {/* {buildingType.imageUrls?.map((el, index) => (
              <div>{el}</div>
            ))} */}
          </S.ImgWrap>
        </S.ImgContainer>
        <S.BuildingInfo>
          <S.InfoItem>
            <TitleUnderline label="가격 정보" />
            <S.InfoContent>
              <li>
                <h3>매물 가격</h3>
                {isBillion(buildingType.price)}&nbsp;
                {isTenMillion(buildingType.price)} 원
              </li>
              <li>
                <h3>관리비</h3>
                <span>매월 {buildingType.manageCost}만 원</span>
              </li>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <TitleUnderline label="상세 정보" />
            <S.InfoContent>
              <li>
                <h3>건물 이름</h3>
                <span>{buildingType.addressDetail}</span>
              </li>
              <li>
                <h3>해당 층</h3>
                <span>{buildingType.floor}</span>
              </li>
              <li>
                <h3>방 개수</h3>
                <span>{buildingType.roomCount}</span>
              </li>
              <li>
                <h3>면적</h3>
                <span>{buildingType.area}</span>
              </li>
            </S.InfoContent>
          </S.InfoItem>
        </S.BuildingInfo>
      </S.Container>
    </>
  );
}
