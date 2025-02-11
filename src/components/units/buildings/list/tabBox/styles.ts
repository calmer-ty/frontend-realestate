import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  .MuiTabs-root {
    margin-top: 1.25rem;
  }
  .MuiTabPanel-root {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 0;
    flex: 1;

    ul {
      overflow-y: auto;
      display: flex;
      row-gap: 1.25rem;
      flex-direction: column;
    }

    ${mediaQueries.tablet(css`
      width: 100%;
    `)}
  }
`;
