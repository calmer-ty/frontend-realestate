import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.article`
  overflow-y: scroll; /* Y축 스크롤 활성화 */
  overflow-x: hidden; /* X축 스크롤 제거 */
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 1024px;
  height: calc(100% - 60px);
  padding: 0px 20px 20px;

  ${mediaQueries.tablet(css`
    width: 100%;
    padding: 0;
  `)}
`;
