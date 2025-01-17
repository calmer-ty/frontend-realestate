import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  border-right: 1px solid #dedede;
  background-color: #fff;
  flex: 1;
  z-index: 1;
  transition: flex 300ms ease-in-out;

  position: relative;
  ${mediaQueries.tablet(css`
    flex: 1;
  `)}
  ${(props) =>
    mediaQueries.mobile(css`
      flex: ${props.scroll ? "3" : "0"};
    `)}
`;

export const TabButton = styled.button`
  display: none;

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
    margin: 0 15px;
    padding: 4px 0 10px 0;
    border-bottom: 2px solid #999;
    background-color: #fff;
  `)}
`;
