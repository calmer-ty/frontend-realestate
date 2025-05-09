import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const MapMode = styled.div`
  display: flex;

  .buttonWrap {
    display: flex;
    gap: 0.5rem;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  > section {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;

    .inputWrap {
      display: flex;
      gap: 1.25rem;
      ${mediaQueries.mobile(css`
        flex-direction: column;
      `)}
    }
  }
`;
