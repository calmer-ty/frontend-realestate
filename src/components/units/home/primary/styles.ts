import styled from "@emotion/styled";
import { colors, mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

// 지도 선택 버튼
export const Container = styled.section<{ hoveredTarget: string | null }>`
  position: relative;
  overflow: hidden;
  background: #000 no-repeat center/cover;
  background-image: url("/images/apartment.jpg");
  border-radius: 0.5rem;
  flex: 1;

  ${mediaQueries.mobile(css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `)}

  .textWrap {
    position: absolute;
    top: 5rem;
    left: 3rem;

    width: 100%;
    height: 8.75rem;

    max-width: 28rem;
    font-size: 3rem;
    word-break: keep-all;
    white-space: normal;
    color: #fff;

    ${mediaQueries.desktop(css`
      max-width: 21rem;
      font-size: 2rem;
    `)}
    ${mediaQueries.mobile(css`
      display: none;
    `)}
  }

  .sliderWrap {
    position: absolute;
    left: 0;
    top: 18rem;

    width: 100%;
    .slick-center div div {
      opacity: 1;
    }
    .slick-dots {
      bottom: -1.875rem;
    }

    ${mediaQueries.desktop(css`
      top: 16rem;
    `)}
    ${mediaQueries.mobile(css`
      position: static;
    `)}
  }

  /* 가상요소 */
  ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #000;
    transition: opacity 0.5s ease-in-out;
    opacity: ${(props) => (typeof props.hoveredTarget === "string" ? "0.7" : "0.4")};
  }
`;

export const TextSlide = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: ${(props) => (props.active ? "translateX(0)" : "translateX(-200%)")};
  transition: opacity 0.5s ease, transform 0.5s ease;

  ${mediaQueries.mobile(css`
    font-size: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 40px;
  `)}
`;

// ListItem
export const ListItem = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 5rem;
  margin: 0 2rem;
  opacity: 0.8;
  border-radius: 0.5rem;
  background-color: ${colors.background};

  a {
    display: flex;
    align-items: center;
    text-indent: 2.5rem;
    width: 100%;
    height: 100%;

    h2 {
      display: flex;
      flex-direction: column;
      row-gap: 0.625rem;
      width: 9rem;
    }

    .iconWrap {
      position: absolute;
      right: 0.75rem;
      bottom: 0.5rem;
    }

    &:hover {
      background-color: ${colors.activeHover};
      box-shadow: rgba(0, 0, 0, 0.1) 0 0.625rem 1.25rem;
    }
  }
`;
