import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

// 지도 선택 버튼
export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
  .inner {
    min-width: 360px;
    padding: 0 360px;

    .slick-dots {
      bottom: -30px;
    }

    ${mediaQueries.extraLargeDesktop(css`
      padding: 0 100px;
    `)}
    ${mediaQueries.largeDesktop(css`
      padding: 0;
    `)}
    ${mediaQueries.desktop(css`
      padding: 0 40px;
    `)}
    ${mediaQueries.tablet(css`
      padding: 0;
    `)}
  }

  /* 가상요소 */
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
    pointer-events: none;
  }

  ${mediaQueries.mobile(css`
    flex: 2;
  `)}
`;
