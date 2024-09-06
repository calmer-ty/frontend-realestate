import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";
import type { IBuildingTypeProps } from "../types";

const buildingTypeBase = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;

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

// 지도 선택 버튼
export const Container = styled.div<IBuildingTypeProps>`
  ${buildingTypeBase}
  background-color: ${(props) => (props.isDisabled ? "#ccc" : "#ffffff")};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};

  ${mediaQueries.mobile2(css`
    height: 150px;
  `)}
`;
