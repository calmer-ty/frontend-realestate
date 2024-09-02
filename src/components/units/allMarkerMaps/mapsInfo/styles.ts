import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";
import type { IScroll } from "./types";
import styled from "@emotion/styled";

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  flex: 1;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dedede;
  background-color: #fff;
  z-index: 1;
  transition: flex 500ms ease-in-out;
  ${(props) =>
    mediaQueries.mobile(css`
      flex: ${props.scroll ? "3" : "0"};
    `)}
`;

export const TabButton = styled.button`
  display: none;
  background-color: #fff;
  .stroke {
    width: 50px;
    height: 3px;
    margin: 5px 0;
    background-color: #dedede;
  }
  ${mediaQueries.mobile(css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
  `)}
`;
