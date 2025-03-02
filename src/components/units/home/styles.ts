import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  display: flex;

  gap: 0.5rem;
  padding: 0.5rem;
  height: calc(100vh - 3.75rem);
  background-color: #f0f5f5;

  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}
`;
