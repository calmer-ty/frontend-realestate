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
  ::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: #f00 url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.1;
    z-index: -1;
  }
  > section {
    height: 50%;
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      row-gap: 10px;
      height: 100%;
      margin: 0 auto;
      /* padding: 40px; */
      max-width: 1280px;
    }
  }
`;
export const Maps = styled.section`
  > div {
    justify-content: space-between;
    column-gap: 20px;
  }
`;
export const BuildingType = styled.div`
  position: relative;
  width: 280px;
  height: 200px;
  padding-bottom: 20px;
  background-color: #fff;
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
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
    > ul {
      display: flex;
      column-gap: 20px;
      width: 100%;
    }
  }
`;
export const RegisteredItem = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  > img {
    object-fit: cover;
  }
  > p {
    display: flex;
    flex-direction: column;
    > strong {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
`;

export const UnImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280px;
  height: 180px;
  background-color: #dedede;
`;
export const Option = styled.section`
  > div {
    flex-direction: column;
  }
`;
