import styled from "@emotion/styled";
import type { ILoadingSpinnerProps } from "./types";

export const Wrap = styled.div<ILoadingSpinnerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => props.size};
`;
