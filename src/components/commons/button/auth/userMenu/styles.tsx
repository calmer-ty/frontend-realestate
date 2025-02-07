import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  display: flex;
  align-items: center;

  > p {
    ${mediaQueries.mobile(css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-color: ${colors.normal};
      border-radius: 50%;

      + button {
        padding: 0;
        width: 36px;
        height: 36px;

        position: absolute;
        right: 22px;
      }
    `)}
    em {
      ${mediaQueries.mobile(css`
        display: none;
      `)}
    }
  }
`;
