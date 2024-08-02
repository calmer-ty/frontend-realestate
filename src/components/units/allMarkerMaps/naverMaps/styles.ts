import { css } from "@emotion/react";
import { mediaQueries } from "@/src/commons/styles/styles";

export const containerStyle = css`
  width: 100%;
  height: 100%;
  flex: 3;
  ${mediaQueries.desktop(css`
    flex: 1;
  `)}
`;
