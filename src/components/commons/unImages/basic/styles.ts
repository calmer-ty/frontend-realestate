import styled from "@emotion/styled";
import type { IUnImageBasicProps } from "./types";

export const UnImage = styled.div<IUnImageBasicProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;
