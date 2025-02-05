import ListItem from "./listItem";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HomeIcon from "@mui/icons-material/Home";

import * as S from "./styles";

export default function BuildingTypeList(): JSX.Element {
  const settings = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplaySpeed: 4000,
    responsive: [
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
          <ListItem title="아파트" desc="거래된 목록들이 지도에!" icon={<LocationCityIcon fontSize="large" color="primary" />} isDisabled={false} href={"/apartment"} />
          <ListItem title="오피스텔" desc="거래된 목록들이 지도에!" icon={<HomeIcon fontSize="large" color="primary" />} isDisabled={false} href={"/officetel"} />
          {/* <ListItem title="오피스텔" desc="준비중" icon={<HomeIcon fontSize="large" color="primary" />} isDisabled={true} /> */}
          <ListItem title="연립다세대" desc="준비중" icon={<MapsHomeWorkIcon fontSize="large" color="primary" />} isDisabled={true} />
        </Slider>
      </div>
    </S.Container>
  );
}
