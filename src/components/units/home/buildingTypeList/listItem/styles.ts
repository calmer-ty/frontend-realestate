import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

interface IBuildingTypeProps {
  isDisabled: boolean;
}

export const ListItem = styled.div<IBuildingTypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  border-radius: 10px;
  background-color: ${(props) => (props.isDisabled ? "#ccc" : "#ffffff")};
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

      max-height: 72px;
      p {
        word-break: keep-all;
        color: #979797;
      }
    }
  }
  .textBox {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 160px;
  }

  .iconWrap {
    position: absolute;
    right: 20px;
    bottom: 20px;

    ${mediaQueries.tablet(css`
      right: 10px;
      bottom: 10px;
    `)}
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  }

  ${mediaQueries.tablet(css`
    width: 240px;
    height: 180px;
  `)}
`;
