import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}
`;
export const MapsWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  ${mediaQueries.tablet(css`
    flex-direction: column-reverse;
  `)}
`;
