import styled from "@emotion/styled";
import { colors, mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

// 지도 선택 버튼
// export const Container = styled.section<{ hoveredTarget: string | null }>`
export const Container = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: ${colors.normal} no-repeat center/cover;
  /* background-image: url("/images/apartment.jpg"); */
  border-radius: 0.5rem;
  flex: 1;

  ${mediaQueries.mobile(css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `)}

  .sliderWrap {
    width: 100%;
    /* 중앙에 올 경우 */
    .slick-center div div {
      opacity: 1;
    }
    .slick-center div div a {
      pointer-events: all;
    }
    .slick-dots {
      bottom: -1.875rem;
      li button:before {
        color: #fff;
      }
    }
  }

  /* 가상요소 */
  /* ::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    transition: opacity 0.5s ease-in-out;
  } */
`;

export const TextSlide = styled.div<{ active: boolean }>`
  font-size: 3rem;
  margin: 3rem;
  word-break: keep-all;
  white-space: normal;
  color: #fff;
  position: relative;
  max-width: 27rem;

  ${mediaQueries.desktop(css`
    font-size: 2rem;
  `)}

  ${mediaQueries.mobile(css`
    display: none;
  `)}
`;
