import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const mapStyle = css`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);

  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;
