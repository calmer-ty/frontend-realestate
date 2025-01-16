"use client";

import Head from "next/head";

import BuildingDetailTop from "./top";
import BuildingDetailBottom from "./bottom";

import * as S from "./styles";
import type { IBuildingDetailProps } from "./types";

export default function BuildingDetail({ buildingData }: IBuildingDetailProps): JSX.Element {
  return (
    <>
      <Head>
        <meta property="og:title" content={buildingData.type} />
        <meta property="og:description" content={`${buildingData.address}_${buildingData.addressDetail}`} />
        <meta property="og:image" content={buildingData.imageUrls?.[0]} />
      </Head>
      <S.Container>
        <BuildingDetailTop buildingData={buildingData} />
        <BuildingDetailBottom buildingData={buildingData} />
      </S.Container>
    </>
  );
}
