import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { colors, mediaQueries } from "@/src/commons/styles";

export const ListItem = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.background};
  border-radius: 0.5rem;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
    transition: background-color 100ms ease-in-out;
    padding: 1rem 1.5rem 2rem;
    height: 100%;

    figure {
      position: relative;
      height: 100%;

      ${mediaQueries.h800(css`
        height: 10rem;
      `)}

      /* 이미지 랩 */
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 100ms ease-in-out;
      }

      ${mediaQueries.mobile(css`
        height: 10rem;
      `)}
    }

    /* buildingDesc */
    figcaption {
      display: flex;
      flex-direction: column;

      strong {
        margin-bottom: 0.25rem;
      }
      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    &:hover {
      background-color: ${colors.hover};

      figure::after {
        background-color: ${colors.cover};
      }
    }
  }
`;
