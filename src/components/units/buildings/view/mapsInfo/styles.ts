import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  border-right: 1px solid #dedede;
  background-color: #fff;
  flex: 1;
  transition: flex 300ms ease-in-out;

  position: relative;
  z-index: 1;

  ${(props) =>
    mediaQueries.tablet(css`
      flex: ${props.scroll ? "3" : "0"};
    `)}
`;

export const TabButton = styled(Button)`
  display: none;
  position: relative;
  color: #000;
  .stroke {
    width: 50px;
    height: 3px;
    margin: 5px 0;
    background-color: #dedede;
  }
  ${mediaQueries.tablet(css`
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
`;
