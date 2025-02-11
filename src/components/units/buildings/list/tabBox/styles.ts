import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  /*tab 컴포넌트를 감싸는 상위 요소 */
  display: flex;
  flex-direction: column;
  width: 50rem;
  height: 100%;

  ${mediaQueries.tablet(css`
    width: 20rem;
  `)}

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
