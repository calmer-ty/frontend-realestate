import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  .MuiTabPanel-root {
    position: relative;
    width: 840px;
    padding: 0;
    margin-top: 20px;

    /* 매물 리스트가 있는 경우 */
    ul {
      overflow-y: auto;
      display: flex;
      row-gap: 20px;
      flex-direction: column;
      padding-right: 10px;
    }

    /* 매물 리스트 O/X */
    ul,
    .noDataInner {
      height: 900px;

      ${mediaQueries.mobile(
        css`
          max-height: 450px;
        `
      )}
    }

    ${mediaQueries.tablet(css`
      width: 100%;
      /* padding: 24px 0; */
    `)}
  }
`;
