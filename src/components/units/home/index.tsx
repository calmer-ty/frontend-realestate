"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { useFetchAllGeocode } from "@/src/hooks/useFetchAllGeocode";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import { useFirebase } from "@/src/hooks/firebase/useFirebase";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";
import UnImageBasic from "../../commons/unImages/basic";
import LoadingSpinner from "../../commons/loadingSpinner";

import type { MouseEventHandler } from "react";
import type { IFirebaseData } from "@/src/commons/types";
import * as S from "./styles";

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default function Home(): JSX.Element {
  const [currentBuildingType, setCurrentBuildingType] = useState<string>("");
  const [firebaseDatas, setFirebaseDatas] = useState<IFirebaseData[]>([]);
  const { readFirebaseDatas } = useFirebase();

  // 상단 버튼 선택 시 데이터 패치
  const fetchBuildingsData: MouseEventHandler<HTMLDivElement> = async (event) => {
    const target = event.currentTarget;
    const buildingType = target.getAttribute("data-href") ?? "";
    setCurrentBuildingType(buildingType);
  };

  // 데이터 프리로딩
  useFetchAllGeocode(currentBuildingType);

  // firebaseDatas
  useEffect(() => {
    const readBuildings = async (): Promise<void> => {
      // 임시로 아파트만 랜덤 렌더링
      const datas = await readFirebaseDatas("apartment");
      setFirebaseDatas(datas);
    };
    void readBuildings();
  }, [readFirebaseDatas]);
  const randomFirebaseDatas = firebaseDatas.sort(() => 0.5 - Math.random()).slice(0, 3);

  // const settings = {
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   // dots: true,
  //   // autoplay: true,
  //   // autoplaySpeed: 5000,

  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         // slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //   ],
  // };
  return (
    <S.Container>
      <S.Maps>
        <div className="inner">
          {/* <Slider {...settings}> */}
          <S.BuildingType data-href="apartment" onMouseEnter={fetchBuildingsData}>
            <Link href="/apartment">
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
            <a href="#">
              <div className="textWrap">
                <h2>주택/빌라</h2>
                <p>준비중</p>
              </div>
              <div className="iconWrap">
                <HomeIcon fontSize="large" color="primary" />
              </div>
            </a>
          </S.UnBuildingType>
          <S.UnBuildingType>
            <a href="#">
              <div className="textWrap">
                <h2>오피스텔</h2>
                <p>준비중</p>
              </div>
              <div className="iconWrap">
                <MapsHomeWorkIcon fontSize="large" color="primary" />
              </div>
            </a>
          </S.UnBuildingType>
          {/* </Slider> */}
        </div>
      </S.Maps>
      <S.Registered>
        <div className="inner">
          <h2>추천드리는 매물입니다.</h2>
          <div className="contents">
            {randomFirebaseDatas.length !== 0 ? (
              <S.RegisteredList>
                {randomFirebaseDatas.map((el) => (
                  <li key={el._id}>
                    <Link href={`/${el.type}/${el._id}`}>
                      {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} alt={el.type} width={300} height={200} /> : <UnImageBasic width="300px" height="200px" fontSize="36px" />}
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
