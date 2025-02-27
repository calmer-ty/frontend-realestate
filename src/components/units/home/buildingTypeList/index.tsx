import { useState } from "react";

import ListItem from "./listItem";

import ApartmentIcon from "@mui/icons-material/Apartment";
// import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./styles";

const buildingTypes = [
  { title: "아파트", desc: "편리한 생활을 위한 공간", icon: <ApartmentIcon fontSize="large" color="primary" />, isDisabled: false, href: "/apartment" },
  { title: "오피스텔", desc: "다목적 공간, 직장과 집을 한 번에", icon: <HomeWorkIcon fontSize="large" color="primary" />, isDisabled: false, href: "/officetel" },
  { title: "빌라", desc: "이웃과 함께하는 아늑한 일상", icon: <OtherHousesIcon fontSize="large" color="primary" />, isDisabled: false, href: "/familyHousing" },
  // { title: "주택", desc: "나만의 공간, 때로는 함께하는 따뜻한 보금자리", icon: <HouseIcon fontSize="large" color="primary" />, isDisabled: true, href: "/house" },
];

export default function BuildingTypeList(): JSX.Element {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  console.log("hoveredTarget: ", hoveredTarget);

  const handleMouseEnter = (title: string): void => {
    setHoveredTarget(title); // 호버된 아이템의 인덱스를 상태로 저장
  };
  const handleMouseLeave = (): void => {
    setHoveredTarget(null); // 호버 아웃 시 상태를 null로 설정
  };

  const settings = {
    slidesToShow: 3,
    autoplaySpeed: 4000,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <S.Container hoveredTarget={hoveredTarget}>
      <div className="inner">
        <Slider {...settings}>
          {buildingTypes.map((building, index) => (
            <ListItem
              key={index}
              {...building}
              onMouseEnter={() => {
                handleMouseEnter(building.title);
              }}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </Slider>
      </div>
    </S.Container>
  );
}
