import { css } from "@emotion/react";
import type { SerializedStyles } from "@emotion/react";

// 미디어 쿼리 믹스인 정의
export const mediaQueries = {
  mobile: (styles: SerializedStyles) => css`
    @media screen and (max-width: 480px), screen and (max-height: 640px) {
      ${styles}
    }
  `,
  mobile2: (styles: SerializedStyles) => css`
    @media screen and (max-height: 768px) {
      ${styles}
    }
  `,
  tablet: (styles: SerializedStyles) => css`
    @media screen and (max-width: 768px), screen and (max-height: 768px) {
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
  extraLarge: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1690px) {
      ${styles}
    }
  `,
};
