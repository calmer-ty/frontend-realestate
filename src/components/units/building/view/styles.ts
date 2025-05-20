import styled from "@emotion/styled";
import { colors, mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  height: calc(100vh - 3.75rem);
  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}
`;
export const MapsWrap = styled.div`
  display: flex;
  flex: 1;
  ${mediaQueries.tablet(css`
    flex-direction: column-reverse;
  `)}
`;

export const MapSelector = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  height: 100%;
  padding: 0.375rem;
  border-right: 0.0625rem solid ${colors.outline};

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 0.375rem;

    span {
      font-size: 0.75rem;
    }

    &.active,
    &:hover {
      background-color: ${colors.primaryHover};
      outline: 0.0625rem solid ${colors.primary};
      font-weight: bold;
    }
    &.active {
      color: ${colors.primary};
    }
  }

  ${mediaQueries.tablet(css`
    flex-direction: row;
    height: initial;
    border-right: 0;
    border-bottom: 0.0625rem solid ${colors.outline};

    > a {
      height: 2rem;
      border: 0.0625rem solid #c5c9cc;
      border-radius: 1.25rem;
      svg {
        display: none;
      }
    }
  `)}
`;
