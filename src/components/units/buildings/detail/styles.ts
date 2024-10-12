import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  padding: 40px;

  ${mediaQueries.mobile(css`
    padding: 0;
  `)}
`;
