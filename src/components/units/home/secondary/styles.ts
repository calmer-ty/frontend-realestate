import styled from "@emotion/styled";
import { colors, mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #accce7;
  border-radius: 1.5rem;

  width: 25%;
  ${mediaQueries.largeDesktop(css`
    width: 30%;
  `)}
  ${mediaQueries.desktop(css`
    width: 40%;
  `)}
  ${mediaQueries.tablet(css`
    width: 100%;
  `)}
`;

// ListItem
export const ListItem = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: ${colors.background};
  border-radius: 1.5rem;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    position: relative;
    transition: background-color 100ms ease-in-out;
    padding: 2rem;

    figure {
      position: relative;
      height: 12rem;

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
    }

    /* buildingDesc */
    figcaption {
      display: flex;
      flex-direction: column;
      > strong {
        margin-bottom: 0.25rem;
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
