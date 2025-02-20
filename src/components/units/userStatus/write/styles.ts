import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  min-width: 42rem;
  height: 100%;
  padding: 1.25rem;
  > section {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;

    .inputWrap {
      display: flex;
      gap: 1.25rem;
      ${mediaQueries.mobile(css`
        flex-direction: column;
      `)}
    }
  }

  ${mediaQueries.tablet(css`
    min-width: initial;
  `)}
  ${mediaQueries.mobile(css`
    padding: 1.25rem;
  `)}
`;

// Building Info
export const MapView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  ${mediaQueries.mobile(css`
    flex-direction: column;
  `)}
`;
export const AddressSearch = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  width: 50%;
  align-self: flex-start;

  .left {
    display: flex;
    column-gap: 1.25rem;
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
    height: 13.75rem;
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
    border: 0.0625rem solid ${colors.blur};
    background-color: ${colors.normal};
    text-align: center;
    line-height: 2.1;
    z-index: 101;
  }
`;
