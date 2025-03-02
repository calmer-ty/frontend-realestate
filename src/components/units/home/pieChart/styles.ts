import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  background-color: ${colors.background};
  border-radius: 0.5rem;
  flex: 1;

  ${mediaQueries.tablet(css`
    display: none;
    flex-direction: column;
  `)}
`;
