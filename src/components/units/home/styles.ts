// import { mediaQueries } from "@/src/commons/styles/styles";
// import { css } from "@emotion/react";

import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
  height: 100%;
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
    > div {
      display: flex;
      row-gap: 10px;
      margin: 0 auto;
      padding: 20px;
      max-width: 1024px;
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
  background-color: #fff;
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: block;
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
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: block;
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
  position: absolute;
  top: 40px;
  left: 40px;
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

export const Option = styled.section`
  > div {
    flex-direction: column;
  }
`;
