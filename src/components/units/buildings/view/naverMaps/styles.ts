import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  ${mediaQueries.extraLargeDesktop(css`
    flex: 2;
  `)}
  ${mediaQueries.largeDesktop(css`
    flex: 1;
  `)}

  #map {
    width: 100%;
    height: 100%;
  }
  .loadingSpinner {
    position: absolute;
    top: 0;
  }
`;
