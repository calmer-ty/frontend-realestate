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
  position: absolute;
  z-index: 101;
  width: 400px;

  ${mediaQueries.mobile(css`
    width: 300px;
  `)}
`;
