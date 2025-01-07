import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  position: relative;
  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;
