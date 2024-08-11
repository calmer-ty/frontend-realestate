import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex: 3;
  ${mediaQueries.desktop(css`
    flex: 2;
  `)}
  ${mediaQueries.tablet(css`
    flex: 1;
  `)}
`;
