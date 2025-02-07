import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}
`;
export const MapsWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  ${mediaQueries.tablet(css`
    flex-direction: column-reverse;
  `)}
`;
export const MapsMenu = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  padding: 6px;
  border-right: 1px solid ${colors.outline};
  > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;

    padding: 10px;
    border-radius: 6px;
    span {
      font-size: 12px;
    }

    &.active,
    &:hover {
      background-color: ${colors.activeHover};
      outline: 1px solid ${colors.active};
      font-weight: bold;
    }
    &.active {
      color: ${colors.active};
    }
  }

  ${mediaQueries.tablet(css`
    flex-direction: row;
    height: initial;

    > a {
      height: initial;
      border: 1px solid #c5c9cc;
      border-radius: 20px;
      svg {
        display: none;
      }
    }
  `)}
`;

export const MapMenu = styled.div`
  padding: 6px 10px;
  border-bottom: 1px solid ${colors.outline}e;
`;
