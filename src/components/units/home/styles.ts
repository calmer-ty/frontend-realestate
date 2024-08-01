import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;
  max-width: 1024px;
`;
export const BuildingType = styled.div`
  position: relative;
  flex-basis: 300px;
  height: 200px;
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
  flex-basis: 300px;
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
