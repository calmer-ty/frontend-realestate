import styled from "@emotion/styled";
import type { IUnImageBasicProps } from "./types";

export const UnImage = styled.div<IUnImageBasicProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dedede;
  width: ${(props) => props.width ?? "80px"};
  height: ${(props) => props.height ?? "80px"};
  font-size: ${(props) => props.fontSize ?? "16px"};
`;
