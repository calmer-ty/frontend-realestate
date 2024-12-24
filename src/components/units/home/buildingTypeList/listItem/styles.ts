import styled from "@emotion/styled";

import type { IBuildingTypeProps } from "../types";

export const ListItem = styled.div<IBuildingTypeProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background-color: ${(props) => (props.isDisabled ? "#ccc" : "#ffffff")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .textWrap {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 160px;
  }

  .iconWrap {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  }
`;
