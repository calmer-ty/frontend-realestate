import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  .inner {
    display: flex;
    flex-direction: column;
    min-width: 1024px;
    min-height: 390px;
    padding: 20px;
    > h2 {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  ${mediaQueries.mobile(css`
    display: none !important;
  `)}
`;

export const RegisteredList = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;
