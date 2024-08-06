import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

import styled from "@emotion/styled";

export const Container = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
`;
export const MapsContents = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;
  max-width: 1024px;
  ${mediaQueries.desktop(css`
    /* flex-direction: column; */
  `)}
`;
export const BuildingType = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  min-width: 280px;
  background-color: #fff;
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: block;
    width: 100%;
    height: 100%;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 20px 0px;
  }
`;
export const BuildingTypeU = styled.div`
  position: relative;
  min-width: 280px;
  height: 200px;
  background-color: #ccc;
  border: 2px solid #efefef;
  border-radius: 10px;
  cursor: pointer;

  > a {
    display: block;
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
  position: absolute;
  top: 40px;
  left: 40px;
`;
export const IconWrap = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export const OptContents = styled.section`
  width: 880px;
  height: 440px;
  > ul {
    display: flex;
    column-gap: 10px;
  }
`;
export const OptItem = styled.li`
  display: flex;
  flex-direction: column;
  border-top: 3px solid #1976d2;
`;
