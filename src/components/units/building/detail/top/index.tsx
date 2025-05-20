import { useMediaQuery } from "@mui/material";

import Image from "next/image";
import BasicUnImage from "@/src/components/commons/unImage/basic";

import * as S from "./styles";
import type { IBuildingDetailProps } from "../types";

export default function BuildingDetailTop({ buildingData }: IBuildingDetailProps): JSX.Element {
  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const isSmallScreen = useMediaQuery("(max-width: 480px)");

  return (
    <>
      {isSmallScreen ? (
        <S.MobileView {...settings}>
          {buildingData.imageUrls !== undefined && buildingData.imageUrls.length > 0 ? (
            buildingData.imageUrls.map((el) => (
              <figure key={el}>
                <Image src={el} alt="buildImg" fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
              </figure>
            ))
          ) : (
            <figure>
              <BasicUnImage className="w-full h-full text-[2.25rem]" />
            </figure>
          )}
        </S.MobileView>
      ) : (
        <S.PCView>
          <figure className="mainImg">
            {buildingData.imageUrls?.[0] !== undefined ? (
              <Image src={buildingData.imageUrls?.[0]} alt="buildImg" fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
            ) : (
              <BasicUnImage className="w-full h-full text-[2rem]" />
            )}
          </figure>
          <div className="subImgWrap">
            {[1, 2, 3, 4].map((index) => {
              const el = buildingData.imageUrls?.[index];
              return (
                <figure key={`${el}_${index}`}>
                  {el !== undefined ? (
                    <Image src={el} alt="buildImg" fill sizes="100%" style={{ objectFit: "cover" }} unoptimized />
                  ) : (
                    <BasicUnImage key={`placeholder_${index}`} className="w-full h-full text-[2rem]" />
                  )}
                </figure>
              );
            })}
          </div>
        </S.PCView>
      )}
    </>
  );
}
