import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";
import type { IBuildingTypeProps } from "./types";

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const flexBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const Container = styled.article`
  ${flexBetween}
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  height: 100%;
  position: relative;
  section {
    ${flexCenter}

    .inner {
      ${flexBetween}
      min-width: 1024px;

      ${mediaQueries.mobile(css`
        min-width: initial;
        row-gap: 60px;
      `)}
    }
  }
`;

// 맵 선택지
export const MapOptions = styled.section`
  position: relative;
  height: 50%;
  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
  }

  ${mediaQueries.mobile(css`
    height: 100%;
    .inner {
      flex-direction: column;
    }
  `)}
`;

const buildingTypeBase = css`
  ${flexCenter}
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;

  > a {
    ${flexCenter}
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
export const BuildingType = styled.div<IBuildingTypeProps>`
  ${buildingTypeBase}
  background-color: ${(props) => (props.isDisabled ? "#ccc" : "#ffffff")};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "auto")};

  ${mediaQueries.mobile2(css`
    height: 150px;
  `)}
`;
export const UnBuildingType = styled.div`
  ${buildingTypeBase}
  background-color: #ccc;

  ${mediaQueries.mobile2(css`
    height: 150px;
  `)}
`;

// 추천하는 매물 목록
export const Registered = styled.section`
  height: 50%;

  .inner {
    flex-direction: column;
    > h2 {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .contents {
    ${flexCenter}
    width: 100%;
    height: 300px;
  }

  ${mediaQueries.mobile(css`
    display: none !important;
  `)}
`;
export const RegisteredList = styled.ul`
  ${flexBetween}
  width: 100%;
  > li {
    > a {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      position: relative;
      /* 이미지 랩 */
      > img {
        object-fit: cover;
      }
      ::before {
        content: "";
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 1;
      }

      > p.buildingDesc {
        display: flex;
        flex-direction: column;
        > strong {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
      :hover {
        ::before {
          display: block;
        }
      }
    }
  }
`;
