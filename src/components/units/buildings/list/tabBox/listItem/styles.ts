import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid #e7e7e7;

  .bottomContents {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;

    ${mediaQueries.tablet(css`
      flex-direction: column;
    `)}
  }
`;
