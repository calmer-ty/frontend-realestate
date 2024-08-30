import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 40px;
  height: 100%;
  width: 100%;
  padding: 40px;
  max-width: 1024px;
`;
export const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  width: 100%;
`;

export const AddressSearch = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 50%;
  align-self: flex-start;
  ${mediaQueries.mobile(css`
    width: 100%;
    flex-direction: column;
  `)}
`;
export const MapView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  ${mediaQueries.mobile(css`
    flex-direction: column;
  `)}
`;
export const MapsWrap = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  ${mediaQueries.mobile(css`
    width: 100%;
  `)}
  #map {
    width: 100%;
    height: 220px;
  }
`;
export const MapsCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #dedede;
  background-color: #efefef;
  text-align: center;
  line-height: 2.1;
  z-index: 101;
`;
export const Footer = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  > button {
    width: 200px;
  }
`;
