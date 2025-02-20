import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  max-width: 64rem;
  height: 100%;
  padding: 1.25rem;

  ${mediaQueries.mobile(css`
    width: 100%;
    padding: 0;
  `)}
`;
