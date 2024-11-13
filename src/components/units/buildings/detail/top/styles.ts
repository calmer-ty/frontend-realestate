import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const ViewContents = styled.section`
  display: flex;
  column-gap: 10px;
  width: 100%;
  height: 440px;

  figure {
    position: relative;
    > img {
      object-fit: cover;
    }
  }
  .mainImg {
    width: 50%;
  }
  .subImgWrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;
    margin: -4px;
    > figure {
      margin: 4px;
      width: calc(50% - 8px);
      height: calc(50% - 8px);
    }
  }

  ${mediaQueries.mobile(css`
    display: none;
  `)}
`;
// 모바일용 슬랙
export const MViewContents = styled(Slider)`
  &.slick-slider {
    display: none;
  }
  figure {
    position: relative;
    height: 400px;
    > img {
      height: 100% !important;
      object-fit: cover; /* 이미지의 비율을 유지하며 꽉 채우기 */
    }
  }

  ${mediaQueries.mobile(css`
    &.slick-slider {
      display: block;
    }
  `)}/* height: 50%;
  &.slick-slider {
    display: none;
  }
  .slick-list,
  .slick-track {
    height: 440px;
  }
  figure {
    height: 100%;
    > img {
      object-fit: contain;
    }
  }

  ${mediaQueries.mobile(css`
    &.slick-slider {
      display: block;
    }
  `)} */
`;
