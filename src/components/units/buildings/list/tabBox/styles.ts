import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  .MuiTabPanel-root {
    position: relative;
    width: 878px;
    height: calc(100vh - 220px);
    ul {
      overflow-y: hidden;
      overflow-y: scroll;
      display: flex;
      row-gap: 20px;
      flex-direction: column;

      height: 100%;
      padding-right: 10px;
    }
    ${mediaQueries.tablet(css`
      width: 100%;
      padding: 24px 0;
    `)}
  }
`;
