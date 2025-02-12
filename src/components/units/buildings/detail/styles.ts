import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  overflow-y: auto; /* Y축 스크롤 활성화 */
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  /* width: 64rem; */
  height: 100%;
  padding: 1.25rem;

  ${mediaQueries.tablet(css`
    width: 100%;
    padding: 0;
  `)}
`;
