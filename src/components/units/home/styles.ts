import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const flexBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.article`
  ${flexBetween}
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  height: 100%;
  position: relative;
  section {
    ${flexCenter}
    .inner {
      ${flexBetween}
      min-width: 1024px;
      ${mediaQueries.mobile(css`
        min-width: initial;
        row-gap: 60px;
      `)}
    }
  }
`;

// 맵 선택지
export const MapOptions = styled.section`
  position: relative;
  width: 100%;
  height: 50%;
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
