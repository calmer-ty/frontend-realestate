import styled from "@emotion/styled";
import { mediaQueries, colors } from "@/src/commons/styles";
import { css } from "@emotion/react";

import { Button } from "@mui/material";

export const UserMenu = styled.div`
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
    `)}
    em {
      ${mediaQueries.mobile(css`
        display: none;
      `)}
    }
  }
`;
export const ArrowButton = styled(Button)`
  padding: 0;

  ${mediaQueries.mobile(css`
    display: none;
  `)}
`;
