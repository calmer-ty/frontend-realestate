import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  /*tab 컴포넌트를 감싸는 상위 요소 */
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 42rem;
  height: 100%;
  padding: 1.25rem 0;
  min-height: 700px;

  ${mediaQueries.mobile(css`
    min-width: initial;
  `)}

  .MuiTabPanel-root {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.25rem 0 0;
    flex: 1;

    ul {
      display: flex;
      row-gap: 1.25rem;
      flex-direction: column;
      height: 100%;
    }

    ${mediaQueries.mobile(css`
      width: 100%;
    `)}
  }
`;
