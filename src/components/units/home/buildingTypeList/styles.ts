import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

// 지도 선택 버튼
export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  position: relative;

  .inner {
    display: flex;
    justify-content: space-between;
    gap: 60px;

    ${mediaQueries.mobile(css`
      flex-direction: column;
      align-items: center;
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
  /* 반응형 */
  ${mediaQueries.mobile(css`
    height: 100%;
  `)}
`;
