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
  { title: "아파트", icon: <ApartmentIcon fontSize="large" color="primary" />, isDisabled: false, href: "/apartment" },
  { title: "오피스텔", icon: <HomeWorkIcon fontSize="large" color="primary" />, isDisabled: false, href: "/officetel" },
  { title: "빌라", icon: <OtherHousesIcon fontSize="large" color="primary" />, isDisabled: false, href: "/familyHousing" },
  // { title: "주택", desc: "나만의 공간, 때로는 함께하는 따뜻한 보금자리", icon: <HouseIcon fontSize="large" color="primary" />, isDisabled: true, href: "/house" },
];
const buildingInfos = [
  { desc: "도시의 편리함 속, 나만의 아늑한 안식처" },
  { desc: "도심 속 나만의 공간, 더 가까운 하루" },
  { desc: "소박하지만 따뜻한, 이웃과 함께하는 삶" },
  // { title: "주택", desc: "나만의 공간, 때로는 함께하는 따뜻한 보금자리", icon: <HouseIcon fontSize="large" color="primary" />, isDisabled: true, href: "/house" },
];

export default function BuildingTypeList(): JSX.Element {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  console.log("hoveredTarget: ", hoveredTarget);

  const handleMouseEnter = (title: string): void => {
    setHoveredTarget(title); // 호버된 아이템의 인덱스를 상태로 저장
  };
  const handleMouseLeave = (): void => {
    setHoveredTarget(null); // 호버 아웃 시 상태를 null로 설정
  };

  console.log("activeSlide: ", activeSlide);
  const settings = {
    // slidesToShow: 3,
    autoplaySpeed: 4000,
    // arrows: false,
    beforeChange: (_: any, next: number) => {
      setActiveSlide(next);
    },

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          // slidesToShow: 2,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          // slidesToShow: 1,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  return (
    <S.Container hoveredTarget={hoveredTarget}>
      <div className="textWrap">
        {buildingInfos.map((building, index) => (
          <S.TextSlide key={index} active={activeSlide === index}>
            {building.desc}
          </S.TextSlide>
        ))}
      </div>
      <div className="sliderWrap">
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
