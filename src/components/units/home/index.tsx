"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useAllGeocodeData } from "@/src/hooks/useAllGeocodeData";
import { useReadFirebaseDatas } from "@/src/hooks/firebase/useReadFirebaseDatas";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";
import UnImageBasic from "../../commons/unImages/basic";

import type { MouseEventHandler } from "react";
import * as S from "./styles";

export default function Home(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentBuildingType, setCurrentBuildingType] = useState<string>("");
  // 데이터 프리로딩
  const { geocodeResults, loading, error: hookError, fetchData } = useAllGeocodeData(currentBuildingType);
  const { readFirebaseData } = useFirebase();

  // 마우스 오버 시 데이터 설정
  const fetchBuildingsData: MouseEventHandler<HTMLDivElement> = async (event) => {
    const target = event.currentTarget;
    const buildingType = target.getAttribute("data-href") ?? "";
    setCurrentBuildingType(buildingType);

    if (geocodeResults.length === 0 && !loading) {
      setIsLoading(true);
      try {
        await fetchData();
      } catch (err) {
        setError(hookError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // firebaseDatas
  const firebaseDatas = useReadFirebaseDatas("apartment");
  const randomFirebaseDatas = firebaseDatas.sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <S.Container>
      <S.Maps>
        <div>
          <S.BuildingType data-href="apartment" onMouseEnter={fetchBuildingsData}>
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
            <a href="#">
              <S.TextWrap>
                <h2>주택/빌라</h2>
                <p>준비중</p>
              </S.TextWrap>
              <S.IconWrap>
                <HomeIcon fontSize="large" color="primary" />
              </S.IconWrap>
            </a>
            {/* </Link> */}
          </S.BuildingTypeU>
          <S.BuildingTypeU>
            {/* <Link href="/"> */}
            <a href="#">
              <S.TextWrap>
                <h2>오피스텔</h2>
                <p>준비중</p>
              </S.TextWrap>
              <S.IconWrap>
                <MapsHomeWorkIcon fontSize="large" color="primary" />
              </S.IconWrap>
            </a>
            {/* </Link> */}
          </S.BuildingTypeU>
        </div>
      </S.Maps>
      <S.Registered>
        <div>
          <h2>추천드리는 매물입니다.</h2>
          <ul>
            {randomFirebaseDatas.map((el) => (
              <S.RegisteredItem key={el._id} onMouseEnter={() => readFirebaseData(el)}>
                <Link href={`/buildings/${el.type}/${el._id}`}>
                  <div className="imageWrap">
                    {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} width={300} height={200} alt={el.type} /> : <UnImageBasic width="300px" height="200px" fontSize="36px" />}
                  </div>
                  <p className="buildingDesc">
                    <span>
                      {el.type}・{el.addressDetail}
                    </span>
                    <strong>
                      매매 {isBillion(el.price)}
                      {isTenMillion(el.price)} 원
                    </strong>
                    <span>
                      {el.floor}층・{el.area}m²・관리비 {el.manageCost}만
                    </span>
                  </p>
                </Link>
              </S.RegisteredItem>
            ))}
          </ul>
        </div>
      </S.Registered>
      {/* <S.Option>
        <div>
          <ChartTest />
        </div>
      </S.Option> */}
    </S.Container>
  );
}
