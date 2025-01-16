import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Container = styled.div`
  ul {
    overflow-y: hidden;
    overflow-y: scroll;
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    height: calc(100vh - 220px);
    padding-right: 20px;

    ${mediaQueries.mobile(css`
      padding-right: 10px;
    `)}
  }

  .css-13xfq8m-MuiTabPanel-root {
    ${mediaQueries.mobile(css`
      padding: 24px 0;
    `)}
  }
`;
