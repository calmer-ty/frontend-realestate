import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  /* width: 24rem; */
  padding: 1rem;
  background-color: #c9e2f5;
  border-radius: 0.5rem;
  gap: 1rem;
  flex: 1;
  /* ${mediaQueries.tablet(css`
    width: 100%;
    flex-direction: row;
    flex: 1;
  `)} */

  .sliderWrap {
    width: 100%;
    height: 100%;

    ${mediaQueries.tablet(css`
      width: 50%;
    `)}
    ${mediaQueries.mobile(css`
      width: 100%;
    `)}
  }
  .infoWrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    flex: 1;

    /* ${mediaQueries.mobile(css`
      display: none;
    `)}
    ${mediaQueries.h800(css`
      flex-direction: row;
    `)}
    ${mediaQueries.tablet(css`
      flex-direction: column;
    `)} */
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
    .slick-slide div {
      height: 100%;
    }
  }
  .slick-dots {
    bottom: 0.5rem;
  }
`;
