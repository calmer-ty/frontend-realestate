"use client";

import Link from "next/link";
import { useState } from "react";

import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";

import type { MouseEventHandler } from "react";
import type { IGeocodeEtcData } from "@/src/commons/types";
import * as S from "./styles";

export default function Home(): JSX.Element {
  const [preloadedData, setPreloadedData] = useState<IGeocodeEtcData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentBuildingType, setCurrentBuildingType] = useState<string>("");

  // 데이터 프리로딩
  const { geocodeResults, loading, error: hookError, fetchData } = useAllGeocodeData(currentBuildingType);

  // 마우스 오버 시 데이터 설정
  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = async (event) => {
    const target = event.currentTarget;
    const buildingType = target.getAttribute("data-href") ?? "";
    setCurrentBuildingType(buildingType);

    if (preloadedData.length === 0 && !loading) {
      setIsLoading(true);
      try {
        await fetchData();
        setPreloadedData(geocodeResults);
      } catch (err) {
        setError(hookError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <S.Container>
      <S.BuildingType data-href="apartment" onMouseEnter={handleMouseEnter}>
        <Link href="/buildings/apartment">
          <S.TextWrap>
            <h2>아파트</h2>
            <p>거래된 목록들이 지도에!</p>
          </S.TextWrap>
          <S.IconWrap>
            <LocationCityIcon fontSize="large" color="primary" />
          </S.IconWrap>
        </Link>
      </S.BuildingType>
      {isLoading && <p>Loading...</p>}
      {error !== null && <p>Error loading data: {error.message}</p>}
      <S.BuildingTypeU>
        {/* <Link href="/"> */}
        <S.TextWrap>
          <h2>주택/빌라</h2>
          <p>준비중</p>
        </S.TextWrap>
        <S.IconWrap>
          <HomeIcon fontSize="large" color="primary" />
        </S.IconWrap>
        {/* </Link> */}
      </S.BuildingTypeU>
      <S.BuildingTypeU>
        {/* <Link href="/"> */}
        <S.TextWrap>
          <h2>오피스텔</h2>
          <p>준비중</p>
        </S.TextWrap>
        <S.IconWrap>
          <MapsHomeWorkIcon fontSize="large" color="primary" />
        </S.IconWrap>
        {/* </Link> */}
      </S.BuildingTypeU>
    </S.Container>
  );
}
