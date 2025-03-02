import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQueries.tablet(css`
    display: none;
    flex-direction: column;
  `)}
`;
