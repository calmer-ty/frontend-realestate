"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useFetchAllGeocodeData } from "@/src/hooks/useFetchAllGeocodeData";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";
import UnImageBasic from "../../commons/unImages/basic";

import type { MouseEventHandler } from "react";
import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";
import LoadingSpinner from "../../commons/loadingSpinner";

export default function Home(): JSX.Element {
  const [currentBuildingType, setCurrentBuildingType] = useState<string>("");
  // 데이터 프리로딩
  useFetchAllGeocodeData(currentBuildingType);
  const { readFirebaseData, readFirebaseDatas } = useFirebase();

  // 마우스 오버 시 데이터 설정
  const fetchBuildingsData: MouseEventHandler<HTMLDivElement> = async (event) => {
    const target = event.currentTarget;
    const buildingType = target.getAttribute("data-href") ?? "";
    setCurrentBuildingType(buildingType);
  };

  // firebaseDatas
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      const datas = await readFirebaseDatas("apartment");
      setFirebaseDatas(datas);
    };

    void readBuildings();
  }, [readFirebaseDatas]);
  const randomFirebaseDatas = firebaseDatas.sort(() => 0.5 - Math.random()).slice(0, 4);
  console.log("randomFirebaseDatas::", randomFirebaseDatas);

  return (
    <S.Container>
      <S.Maps>
        <div className="inner">
          <S.BuildingType data-href="apartment" onMouseEnter={fetchBuildingsData}>
            <Link href="/buildings/apartment">
              <div className="textWrap">
                <h2>아파트</h2>
                <p>거래된 목록들이 지도에!</p>
              </div>
              <div className="iconWrap">
                <LocationCityIcon fontSize="large" color="primary" />
              </div>
            </Link>
          </S.BuildingType>
          <S.UnBuildingType>
            {/* <Link href="/"> */}
            <a href="#">
              <div className="textWrap">
                <h2>주택/빌라</h2>
                <p>준비중</p>
              </div>
              <div className="iconWrap">
                <HomeIcon fontSize="large" color="primary" />
              </div>
            </a>
            {/* </Link> */}
          </S.UnBuildingType>
          <S.UnBuildingType>
            {/* <Link href="/"> */}
            <a href="#">
              <div className="textWrap">
                <h2>오피스텔</h2>
                <p>준비중</p>
              </div>
              <div className="iconWrap">
                <MapsHomeWorkIcon fontSize="large" color="primary" />
              </div>
            </a>
            {/* </Link> */}
          </S.UnBuildingType>
        </div>
      </S.Maps>
      <S.Registered>
        <div className="inner">
          <h2>추천드리는 매물입니다.</h2>
          <div className="contents">
            {randomFirebaseDatas.length !== 0 ? (
              <S.RegisteredList>
                {randomFirebaseDatas.map((el) => (
                  <li key={el._id} onMouseEnter={() => readFirebaseData(el)}>
                    <Link href={`/buildings/${el.type}/${el._id}`}>
                      <div className="imageWrap">
                        {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} alt={el.type} fill /> : <UnImageBasic width="300px" height="200px" fontSize="36px" />}
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
                  </li>
                ))}
              </S.RegisteredList>
            ) : (
              <LoadingSpinner size={100} />
            )}
          </div>
        </div>
      </S.Registered>
    </S.Container>
  );
}
