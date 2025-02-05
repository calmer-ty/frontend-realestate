import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
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
      flex: ${props.scroll ? "1" : "0"};
    `)}
`;

export const TabButton = styled.button`
  display: none;
  position: relative;
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
    padding: 4px 0 10px 0;
    border-top: 1px solid #dedede;
    background-color: #fff;
  `)}

  &::after {
    content: "";
    width: calc(100% - 30px);
    height: 2px;
    background-color: #999;

    position: absolute;
    bottom: 0px;
    left: 15px;
  }
  /* &:hover {
    bgc
  } */
`;
