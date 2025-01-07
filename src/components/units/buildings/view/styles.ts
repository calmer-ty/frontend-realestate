import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 60px;

  position: relative;
  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;
