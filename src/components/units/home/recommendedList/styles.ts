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
    display: flex;
    flex-direction: column;
    min-width: 360px;
    padding: 0 20px;
    > h2 {
      width: 100%;
      padding-left: 40px;
      margin-bottom: 20px;

      ${mediaQueries.mobile(css`
        width: max-content;
        padding-left: 0;
        margin: 10px auto 10px;
        font-size: 20px;
      `)}
    }

    .slick-dots {
      bottom: -30px;
    }
  }

  /* unItems */
  .unItems {
    margin: 80px auto;
  }
`;

export const RegisteredList = styled(Slider)``;
