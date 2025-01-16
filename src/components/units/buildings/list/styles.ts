import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  justify-content: center;
  flex-direction: column;
  h2 {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
  }

  ${mediaQueries.mobile(css`
    min-width: 360px;
  `)}
`;
