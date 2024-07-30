import { css } from "@emotion/react";
import { mediaQueries } from "@/src/commons/styles/styles";
import type { CSSProperties } from "react";
// export const viewStyle = {
//   container: {
//     width: "100%",
//     height: "100%",
//     flex: "4",
//     // ${mediaQueries.desktop(css`
//     //   border: none;
//     //   background-color: initial;
//     // `)}
//   },
//   img: {
//     position: "absolute",
//     left: "50%",
//     top: "50%",
//     transform: "translate(-50%,-50%)",
//     zIndex: "1",
//   },
// } as const;
export const containerStyle = css`
  width: 100%;
  height: 100%;
  flex: 4;
  background-color: #f00;
  ${mediaQueries.desktop(css`
    /* flex: 2; */
  `)}
` as CSSProperties;
export const imgStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
` as CSSProperties;
