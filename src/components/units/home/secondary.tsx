import { useMemo } from "react";
import { motion } from "framer-motion";

import ImgSkeleton from "@/src/components/commons/skeleton/figure";
import Link from "next/link";
import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import { korToEng } from "@/src/commons/libraries/utils/convertCollection";
import { formatPrice, getTransactionText } from "@/src/commons/libraries/utils/priceFormatter";

import * as S from "./styles";
import type { IFirestore } from "@/src/commons/types";

interface IRecommendedListItemProps {
  el: IFirestore;
}

interface ISecondaryProps {
  firestoreData: IFirestore[];
}

const settings = {
  arrows: false,
  dots: true,
  slidesToShow: 4,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1280, // 1280px 이하일 때
      settings: {
        slidesToShow: 3, // 예를 들어 2개만 보이게 변경
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Secondary({ firestoreData }: ISecondaryProps): JSX.Element {
  const randomFirestores = useMemo(() => {
    return firestoreData.sort(() => 0.5 - Math.random()).slice(0, 5);
  }, [firestoreData]);

  return (
    <section className="flex flex-col p-4 pb-8 gap-2 flex-1 bg-white">
      <h3 className="px-4 text-xl font-bold">추천하는 매물</h3>
      {randomFirestores.length !== 0 ? (
        <S.SliderStyle {...settings}>
          {randomFirestores.map((el, index) => (
            <ListItem key={`${el._id}_${index}`} el={el} />
          ))}
        </S.SliderStyle>
      ) : (
        <ImgSkeleton />
      )}
    </section>
  );
}

function ListItem({ el }: IRecommendedListItemProps): JSX.Element {
  const MotionLink = motion(Link);
  return (
    <S.RecommendedLink key={el._id}>
      <MotionLink href={`/${korToEng(el.buildingType)}/${el._id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
        <figure>
          {el.imageUrls?.[0] !== undefined ? (
            <Image src={el.imageUrls?.[0]} alt={el.buildingType} fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
          ) : (
            <BasicUnImage className="text-3xl" />
          )}
        </figure>
        <figcaption className="flex flex-col p-1">
          <span>
            {el.buildingType}・{el.addressDetail}
          </span>
          <strong className="mb-1">{getTransactionText(el.transactionType, el.price, el.rent)}</strong>
          <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {el.floor}층・{el.area}m²・관리비 {formatPrice(el.manageCost)}
          </span>
        </figcaption>
      </MotionLink>
    </S.RecommendedLink>
  );
}
