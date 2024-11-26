import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);

  position: relative;
  ${mediaQueries.mobile(css`
    flex-direction: column;
  `)}
`;
