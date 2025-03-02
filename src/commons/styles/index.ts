import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";

// ${mediaQueries.tablet`
//   flex-direction: column;
// `}
// 미디어 쿼리 믹스인 정의
export const mediaQueries = {
  mobile: (styles: SerializedStyles) => css`
    /* @media screen and (max-width: 480px), screen and (max-height: 640px) { */
    @media screen and (max-width: 480px) {
      ${styles}
    }
  `,
  mobile2: (styles: SerializedStyles) => css`
    /* @media screen and (max-width: 480px), screen and (max-height: 640px) { */
    @media screen and (min-width: 480px) {
      ${styles}
    }
  `,
  tablet: (styles: SerializedStyles) => css`
    /* @media screen and (max-width: 768px), screen and (max-height: 768px) { */
    @media screen and (max-width: 768px) {
      ${styles}
    }
  `,
  desktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1024px) {
      ${styles}
    }
  `,
  largeDesktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1280px) {
      ${styles}
    }
  `,
  extraLargeDesktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1690px) {
      ${styles}
    }
  `,
};

// colors
export const colors = {
  active: "#1976d2",
  activeHover: "#f6fafd",

  hover: "#efefef",
  cover: "rgba(0, 0, 0, 0.2)",
  normal: "#e0e0e0",
  blur: "#656565",
  outline: "#dedede",
  background: "#ffffff",
};
