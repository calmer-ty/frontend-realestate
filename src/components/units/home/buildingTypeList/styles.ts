import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// 지도 선택 버튼
export const Container = styled.section<{ hoveredTarget: string | null }>`
  position: relative;
  background: #000 no-repeat center/cover;
  background-image: url("/images/apartment.jpg");
  flex: 1;

  .sliderWrap {
    position: absolute;
    left: 3rem;
    top: 18rem;

    width: 22.5rem;

    .slick-dots {
      bottom: -1.875rem;
    }
  }

  .textWrap {
    position: absolute;
    top: 100px;
    left: 100px;
    color: #fff;

    width: 28rem;
    font-size: 3rem;
    word-break: keep-all;
    white-space: normal;
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
    opacity: ${(props) => (typeof props.hoveredTarget === "string" ? "0.6" : "0.2")};
  }
`;

export const TextSlide = styled.div<{ active: boolean }>`
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: ${(props) => (props.active ? "translateX(0)" : "translateX(-200%)")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  position: absolute;
  /* width: 200px; */
`;

// ListItem
export const ListItem = styled.div<{ isDisabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 9rem;
  margin: 3rem 1.25rem;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 0.625rem;
    background-color: ${(props) => (props.isDisabled ? colors.normal : colors.background)};

    .descWrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        word-break: keep-all;
        color: ${colors.blur};
      }
    }
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0 0.625rem 1.25rem;
    }
  }
  .textBox {
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
`;
