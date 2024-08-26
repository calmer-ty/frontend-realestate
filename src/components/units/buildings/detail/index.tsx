"use client";

import Head from "next/head";
import Image from "next/image";

import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";

import TitleUnderline from "@/src/components/commons/titles/underline";
import UnImageBasic from "@/src/components/commons/unImages/basic";

import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";

interface IBuildingDetailProps {
  buildingData: IFirebaseData;
}

export default function BuildingDetail({ buildingData }: IBuildingDetailProps): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content={buildingData.type} />
        <meta property="og:description" content={`${buildingData.address}_${buildingData.addressDetail}`} />
        <meta property="og:image" content={buildingData.imageUrls?.[0]} />
      </Head>
      <S.Container>
        <S.ImgContainer>
          <S.ImgInner>
            <Image src={buildingData.imageUrls?.[0] ?? "No address available"} alt="mainImg" width={507} height={440} />
            <div className="subImgWrap">
              {[1, 2, 3, 4].map((index) => {
                const el = buildingData.imageUrls?.[index];
                return (
                  <div key={`${el}_${index}`}>
                    {el !== undefined ? (
                      <Image src={el} alt={buildingData.address ?? "No address available"} width={248.5} height={215} />
                    ) : (
                      <UnImageBasic key={`placeholder_${index}`} width="100%" height="100%" fontSize="36px" />
                    )}
                  </div>
                );
              })}
            </div>
          </S.ImgInner>
        </S.ImgContainer>
        <S.BuildingInfo>
          <S.InfoItem>
            <TitleUnderline label="가격 정보" />
            <S.InfoList>
              <li>
                <h3>매물 가격</h3>
                {isBillion(buildingData.price)}&nbsp;
                {isTenMillion(buildingData.price)} 원
              </li>
              <li>
                <h3>관리비</h3>
                <span>매월 {buildingData.manageCost}만 원</span>
              </li>
            </S.InfoList>
          </S.InfoItem>

          <S.InfoItem>
            <TitleUnderline label="상세 정보" />
            <S.InfoList>
              <li>
                <h3>건물 이름</h3>
                <span>{buildingData.addressDetail}</span>
              </li>
              <li>
                <h3>해당 층</h3>
                <span>{buildingData.floor}</span>
              </li>
              <li>
                <h3>방 개수</h3>
                <span>{buildingData.roomCount}</span>
              </li>
              <li>
                <h3>면적</h3>
                <span>{buildingData.area}</span>
              </li>
            </S.InfoList>
          </S.InfoItem>

          <S.InfoItem>
            <TitleUnderline label="매물 설명" />
            {buildingData.desc ?? "설명이 없습니다."}
          </S.InfoItem>
        </S.BuildingInfo>
      </S.Container>
    </>
  );
}
