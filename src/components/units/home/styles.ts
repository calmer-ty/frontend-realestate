import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 60px);
`;

// 맵 선택지
export const MapOptions = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  height: 50%;

  .inner {
    display: flex;
    justify-content: space-between;
    width: 1024px;
  }
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
  }

  ${mediaQueries.mobile(css`
    height: 100%;
    .inner {
      flex-direction: column;
    }
  `)}
`;
