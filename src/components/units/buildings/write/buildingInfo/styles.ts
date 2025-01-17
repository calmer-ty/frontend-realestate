import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

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
export const AddressSearch = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 50%;
  align-self: flex-start;

  .left {
    display: flex;
    column-gap: 20px;
  }
  ${mediaQueries.mobile(css`
    width: 100%;
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
  .mapCover {
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
  }
`;
export const TwinInputWrap = styled.div`
  display: flex;
  gap: 20px;
  ${mediaQueries.mobile(css`
    flex-direction: column;
  `)}
`;
