import styled from "@emotion/styled";
import { colors, mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 24rem;
  padding: 1rem;
  background-color: #c9e2f5;
  border-radius: 0.5rem;
  gap: 1rem;

  ${mediaQueries.tablet(css`
    width: 100%;
    flex-direction: row;
  `)}

  .infoWrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;

    ${mediaQueries.mobile(css`
      display: none;
    `)}
    ${mediaQueries.h960(css`
      flex-direction: row;
    `)}
  }
`;
export const SliderStyle = styled(Slider)`
  /* width: 300px; */
  .slick-dots {
    bottom: 0.5rem;
  }

  ${mediaQueries.tablet(css`
    width: 50%;
  `)}
  ${mediaQueries.mobile(css`
    width: 100%;
  `)}
`;

// ListItem
export const ListItem = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.background};
  border-radius: 0.5rem;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
    transition: background-color 100ms ease-in-out;
    padding: 1rem 1.5rem 2rem;
    height: 100%;

    figure {
      position: relative;
      height: 20rem;

      ${mediaQueries.h960(css`
        height: 10rem;
      `)}

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

      ${mediaQueries.mobile(css`
        height: 10rem;
      `)}
    }

    /* buildingDesc */
    figcaption {
      display: flex;
      flex-direction: column;

      strong {
        margin-bottom: 0.25rem;
      }
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    &:hover {
      background-color: ${colors.hover};

      figure::after {
        background-color: ${colors.cover};
      }
    }
  }
`;
