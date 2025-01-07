import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 1024px;

  ${mediaQueries.tablet(css`
    width: 100%;
  `)}
`;
