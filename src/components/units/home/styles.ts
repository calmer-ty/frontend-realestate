import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 지도 선택 버튼
export const Primary = styled.section`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1.2;

  .row-item {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    a {
      width: 100%;
      height: 100%;
      padding: 1rem 3rem 1rem 1.5rem;
      border-radius: 0.75rem;
      border: 0.125rem solid ${colors.outline};
      background: white no-repeat right 20px bottom 20px/2rem;
      transition: background-color 0.3s ease-in-out;
      /* 이미지 */
      &.link-1 {
        background-image: url("/images/icon_apt.png");
      }
      &.link-2 {
        background-image: url("/images/icon_office.png");
      }
      &.link-3 {
        background-image: url("/images/icon_house.png");
      }
      &.link-4 {
        background-image: url("/images/icon_houseContract.png");
      }
      &.link-5 {
        background-image: url("/images/icon_houseSale.png");
      }
      &:hover {
        background-color: ${colors.cover};
      }
    }
  }
`;

// SliderStyle
export const SliderStyle = styled(Slider)`
  width: 100%;
  height: 100%;
  .slick-list {
    height: 100%;
    .slick-track {
      height: 100%;
    }
    .slick-slide {
      padding: 0 1rem;
      div {
        height: 100%;
      }
    }
  }
  .slick-dots {
    bottom: -1.5rem;
  }
`;

export const RecommendedLink = styled.div`
  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
    transition: background-color 100ms ease-in-out;
    height: 100%;

    &:hover {
      background-color: ${colors.hover};

      figure::after {
        background-color: ${colors.cover};
      }
    }

    figure {
      position: relative;
      height: 100%;

      /* 이미지 랩 */
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 100ms ease-in-out;
      }
    }
  }
`;
