import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const mapStyle = css`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: calc(100vh - 60px);

  ${mediaQueries.mobile(css`
    flex-direction: column;
  `)}
`;
