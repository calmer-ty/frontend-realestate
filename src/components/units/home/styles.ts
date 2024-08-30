import { mediaQueries } from "@/src/commons/styles/styles";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
    height: 50%;
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

export const Maps = styled.section`
  position: relative;

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
    height: 100% !important;
    .inner {
      flex-direction: column;
    }
  `)}
`;

const buildingTypeBase = css`
  position: relative;
  width: 280px;
  height: 200px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #fff;

  > a {
    ${flexCenter}
    width: 100%;
    height: 100%;

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
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px;
  }
`;
export const BuildingType = styled.div`
  ${buildingTypeBase}
`;
export const UnBuildingType = styled.div`
  ${buildingTypeBase}
  background-color: #ccc;
`;

export const Registered = styled.section`
  @media screen and (max-width: 480px) {
    display: none !important;
  }
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
