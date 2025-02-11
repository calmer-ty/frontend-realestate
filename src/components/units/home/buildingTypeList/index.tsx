import ListItem from "./listItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ApartmentIcon from "@mui/icons-material/Apartment";
import HouseIcon from "@mui/icons-material/House";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import * as S from "./styles";

export default function BuildingTypeList(): JSX.Element {
  const settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplaySpeed: 4000,

    responsive: [
      {
        breakpoint: 1690,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <S.Container>
      <div className="inner">
        <Slider {...settings}>
          <ListItem title="아파트" desc="편리한 생활을 위한 공간" icon={<ApartmentIcon fontSize="large" color="primary" />} isDisabled={false} href={"/apartment"} />
          <ListItem title="오피스텔" desc="다목적 공간, 직장과 집을 한 번에" icon={<HomeWorkIcon fontSize="large" color="primary" />} isDisabled={false} href={"/officetel"} />
          <ListItem title="빌라" desc="이웃과 함께하는 아늑한 일상" icon={<OtherHousesIcon fontSize="large" color="primary" />} isDisabled={false} href={"/familyHousing"} />
          <ListItem title="주택" desc="나만의 공간, 때로는 함께하는 따뜻한 보금자리" icon={<HouseIcon fontSize="large" color="primary" />} isDisabled={true} href={"/house"} />
        </Slider>
      </div>
    </S.Container>
  );
}
