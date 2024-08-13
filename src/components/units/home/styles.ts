// import { mediaQueries } from "@/src/commons/styles/styles";
// import { css } from "@emotion/react";

import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 40px;
  width: 100%;
  height: 100%;
  position: relative;
  > section {
    height: 50%;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      row-gap: 10px;
      height: 100%;
      padding: 0 20px;
      margin: 0 auto;
      max-width: 1280px;
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
    background: #f00 url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
  }
  > div {
    justify-content: space-between;
    column-gap: 60px;
  }
`;
export const BuildingType = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  padding-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px;
  }
`;
export const BuildingTypeU = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  background-color: #ccc;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px;
  }
`;

export const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 160px;
`;
export const IconWrap = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export const Registered = styled.section`
  background-color: #fff;
  > div {
    flex-direction: column;
    > h2 {
      width: 100%;
    }
    > ul {
      display: flex;
      column-gap: 30px;
      width: 100%;
      height: 300px;
    }
  }
`;
export const RegisteredItem = styled.li`
  > a {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    /* 이미지 랩 */
    div.imageWrap {
      width: 300px;
      height: 200px;
      position: relative;
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
      }
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
      .imageWrap {
        ::before {
          display: block;
        }
      }
    }
  }
`;

export const Option = styled.section`
  > div {
    flex-direction: column;
  }
`;
