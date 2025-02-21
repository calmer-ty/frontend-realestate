import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

import { Button } from "@mui/material";

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

  ${mediaQueries.tablet(css`
    min-width: initial;
  `)}
  ${mediaQueries.mobile(css`
    padding: 1.25rem;
  `)}
`;

export const CheckBudgetButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
export const MapModeToggleButton = styled(Button)`
  position: absolute;
  top: 50px;
  right: 10px;
`;

export const InputUnit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.625rem;
  width: 100%;
`;
