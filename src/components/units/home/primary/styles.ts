import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// 지도 선택 버튼
export const Container = styled.section<{ hoveredTarget: string | null }>`
  position: relative;
  overflow: hidden;
  background: #000 no-repeat center/cover;
  background-image: url("/images/apartment.jpg");
  border-radius: 1rem;
  flex: 1;

  .textWrap {
    position: absolute;
    top: 5rem;
    left: 3rem;
    color: #fff;

    width: 28rem;
    font-size: 3rem;
    word-break: keep-all;
    white-space: normal;
  }

  .sliderWrap {
    position: absolute;
    left: 0;
    top: 18rem;

    width: 100%;
    .slick-center {
      transform: scale(1.1);
    }
    .slick-dots {
      bottom: -1.875rem;
    }
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
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: ${(props) => (props.active ? "translateX(0)" : "translateX(-200%)")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  position: absolute;
`;

// ListItem
export const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 5rem;
  margin: 2rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background-color: ${colors.background};

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
