import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}
`;
export const MapsWrap = styled.div`
  display: flex;
  flex: 1;
  ${mediaQueries.tablet(css`
    flex-direction: column-reverse;
  `)}
`;
