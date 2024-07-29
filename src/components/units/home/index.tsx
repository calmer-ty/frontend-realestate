"use client";

import Link from "next/link";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";
import * as S from "./styles";

export default function Home(): JSX.Element {
  return (
    <S.Container>
      <S.BuildingType>
        <Link href="/buildings">
          <S.TextWrap>
            <h2>아파트</h2>
            <p>거래된 목록들이 지도에!</p>
          </S.TextWrap>
          <S.IconWrap>
            <LocationCityIcon fontSize="large" color="primary" />
          </S.IconWrap>
        </Link>
      </S.BuildingType>
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
