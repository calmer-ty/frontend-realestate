import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  .inner {
    min-width: 360px;
    min-height: 390px;
    .innerBox {
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      > h2 {
        width: 100%;
        padding-left: 40px;
        margin-bottom: 20px;

        ${mediaQueries.mobile(css`
          width: max-content;
          margin: 0 auto 20px;
        `)}
      }

      .slick-dots {
        bottom: -30px;
      }
    }
  }
  ${mediaQueries.mobile(css`
    flex: 3;
  `)}

  /* unItems */
  .unItems {
    margin: 80px auto;
  }
`;

export const RegisteredList = styled(Slider)`
  margin: 0 40px;
  ${mediaQueries.desktop(css`
    margin: 0 20px;
  `)}
`;
