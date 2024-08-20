import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

import styled from "@emotion/styled";

export const Container = styled.aside`
  overflow-y: auto;
  flex: 1;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dedede;
  background-color: #fff;
  z-index: 1;

  ${mediaQueries.largeDesktop(css`
    flex: 2;
  `)}
`;
