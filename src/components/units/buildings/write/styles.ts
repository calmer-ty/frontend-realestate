import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Form = styled.form`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 1024px;
  height: calc(100vh - 120px);
  padding: 0 20px 20px;
  > section {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .inputWrap {
      display: flex;
      gap: 20px;
      ${mediaQueries.mobile(css`
        flex-direction: column;
      `)}
    }
  }

  ${mediaQueries.mobile(css`
    padding: 20px;
  `)}
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  > button {
    width: 200px;
  }
`;
