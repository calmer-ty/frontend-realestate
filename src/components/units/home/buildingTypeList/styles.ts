import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

interface IBuildingTypeListProps {
  hoveredTarget: string | null;
}
interface IBuildingTypeProps {
  isDisabled: boolean;
}

// 지도 선택 버튼
export const Container = styled.section<IBuildingTypeListProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1;
  .inner {
    min-width: 22.5rem;

    .slick-dots {
      bottom: -1.875rem;
    }
  }

  /* 가상요소 */
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #000 no-repeat center/cover;
    background-image: url("/images/apartment.jpg");
    opacity: 0.2;
    pointer-events: none;
    transition: opacity 0.5s ease-in-out;
    opacity: ${(props) => (typeof props.hoveredTarget === "string" ? "0.2" : "0.6")};
  }
`;

export const ListItem = styled.div<IBuildingTypeProps>`
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
