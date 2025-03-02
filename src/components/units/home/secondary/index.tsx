import { useMemo } from "react";
import dynamic from "next/dynamic";

import ListItem from "./listItem";
import ImgSkeleton from "@/src/components/commons/skeleton/figure";
// import NoDataMessage from "@/src/components/commons/noDataMessage";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";
interface IHomeSecondaryProps {
  firestoreData: IFirestore[];
}

const settings = {
  arrows: false,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  // responsive: [
  //   {
  //     breakpoint: 768,
  //     settings: {
  //       slidesToShow: 2,
  //     },
  //   },
  //   {
  //     breakpoint: 480,
  //     settings: {
  //       slidesToShow: 1,
  //     },
  //   },
  // ],
};

const PieChartComponent = dynamic(() => import("../pieChart"), { ssr: false, loading: () => <ImgSkeleton height="16rem" /> });

export default function HomeSecondary({ firestoreData }: IHomeSecondaryProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreData.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreData]);

  return (
    <S.Container>
      {randomFirestores.length !== 0 ? (
        <Slider {...settings}>
          {randomFirestores.map((el, index) => (
            <ListItem key={`${el._id}_${index}`} el={el} />
          ))}
        </Slider>
      ) : (
        <ImgSkeleton height="14rem" />
      )}

      <PieChartComponent />
      {/* <NoDataMessage text="개발중입니다" /> */}
    </S.Container>
  );
}
