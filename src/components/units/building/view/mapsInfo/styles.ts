import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

import Button from "@mui/material/Button";

interface IScroll {
  scroll: boolean;
}

export const Container = styled.aside<IScroll>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-right: 0.0625rem solid ${colors.outline};
  background-color: #fff;
  flex: 1;

  position: relative;
  z-index: 1;
  transition: flex 0.3s ease-in-out;

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
    width: 3.125rem;
    height: 0.125rem;
    margin: 0.375rem 0;
    background-color: #dedede;
  }
  ${mediaQueries.tablet(css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0 0.625rem 0;
    border-top: 1px solid ${colors.outline};
    background-color: #fff;
  `)}
`;
