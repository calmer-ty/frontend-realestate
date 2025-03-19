import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div<{ cover: string }>`
  overflow: hidden;
  position: relative;
  background-color: ${colors.background};
  border-radius: 0.5rem;
  flex: 1;

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    height: 100%;
    padding: 1rem 2rem;

    span {
      display: none;
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #dedede no-repeat center/cover;
      /* background-image: url("/images/news.jpg"); */
      background-image: ${(props) => `url(${props.cover})`};
      transform: translateX(100%);
      transition: all 0.3s ease-in-out;
    }
  }

  &:hover {
    box-shadow: 0 0 0.3rem ${colors.blur};

    a {
      span {
        display: flex;
        align-items: center;
        column-gap: 0.25rem;
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: ${colors.background};
        padding: 0.5rem 1rem;
        border-radius: 1rem 0rem 0rem 0rem;
        font-weight: bold;
      }
      &::before {
        transform: translateX(0);
      }
    }
  }

  /* ${mediaQueries.tablet(css`
    display: none;
  `)} */
`;
