import { useState } from "react";

import ListItem from "./listItem";

import ApartmentIcon from "@mui/icons-material/Apartment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as S from "./styles";

const buildingTypes = [
  { title: "아파트", icon: <ApartmentIcon fontSize="large" color="primary" />, target: "", href: "/apartment" },
  { title: "오피스텔", icon: <HomeWorkIcon fontSize="large" color="primary" />, target: "", href: "/officetel" },
  { title: "빌라", icon: <OtherHousesIcon fontSize="large" color="primary" />, target: "", href: "/familyHousing" },
  { title: "청약", icon: <OtherHousesIcon fontSize="large" color="primary" />, target: "_blank", href: "https://apply.lh.or.kr/lhapply/main.do#gnrlPop" },
];
const buildingInfos = [
  { desc: "도시의 편리함 속, 나만의 아늑한 안식처" },
  { desc: "도심 속 나만의 공간, 더 가까운 하루" },
  { desc: "소박하지만 따뜻한, 이웃과 함께하는 삶" },
  { desc: "내 집 마련의 첫 걸음, 꿈을 현실로" },
];

export default function HomePrimary(): JSX.Element {
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);

  const handleMouseEnter = (title: string): void => {
    setHoveredTarget(title); // 호버된 아이템의 인덱스를 상태로 저장
  };
  const handleMouseLeave = (): void => {
    setHoveredTarget(null); // 호버 아웃 시 상태를 null로 설정
  };

  const settings = {
    centerMode: true, // centerMode 활성화
    slidesToShow: 3, // 3개만 보여주기
    centerPadding: "20px", // 중앙 아이템 양옆에 여백 주기
    initialSlide: 2, // 두 번째 아이템을 처음에 중앙에 배치

    // autoplay: true,
    // autoplaySpeed: 4000,
    dots: true,
    arrows: false,
    beforeChange: (_: any, next: number) => {
      setActiveSlide(next);
    },

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
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
