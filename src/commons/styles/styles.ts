import type { SerializedStyles } from "@emotion/react";
import { css } from "@emotion/react";

// 미디어 쿼리 믹스인 정의
export const mediaQueries = {
  mobile: (styles: SerializedStyles) => css`
    @media screen and (max-width: 480px) {
      ${styles}
    }
  `,
  tablet: (styles: SerializedStyles) => css`
    @media screen and (max-width: 768px) {
      ${styles}
    }
  `,
  desktop: (styles: SerializedStyles) => css`
    @media screen and (max-width: 1024px) {
      ${styles}
    }
  `,
};
