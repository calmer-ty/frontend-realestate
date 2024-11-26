import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Maps = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 3;
  ${mediaQueries.largeDesktop(css`
    flex: 2;
  `)}
  ${mediaQueries.mobile(css`
    flex: 1;
  `)}
`;
