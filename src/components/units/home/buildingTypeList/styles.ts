import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// 지도 선택 버튼
export const Container = styled.section`
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
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
    pointer-events: none;
  }
`;

interface IBuildingTypeProps {
  isDisabled: boolean;
}

export const ListItem = styled.div<IBuildingTypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 16rem;
  height: 12rem;
  margin: 0 auto;
  border-radius: 0.625rem;
  background-color: ${(props) => (props.isDisabled ? colors.normal : colors.background)};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

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
  }
  .textBox {
    display: flex;
    flex-direction: column;
    row-gap: 0.625rem;
    width: 9rem;
  }

  .iconWrap {
    position: absolute;
    right: 1.25rem;
    bottom: 1.25rem;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  }
`;
