import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;

export const MapMenu = styled.div`
  padding: 6px 10px;
  border-bottom: 1px solid #dedede;
`;
