import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;

  position: relative;
  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;
