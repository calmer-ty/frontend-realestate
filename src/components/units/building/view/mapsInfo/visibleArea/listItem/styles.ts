import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const ListItem = styled.ul`
  height: 100%;
  > li {
    padding: 0.625rem 1rem;
    border-bottom: 1px solid ${colors.outline};
    cursor: pointer;

    h3 {
      font-weight: bold;
      font-size: 1.25rem;
    }

    &:hover {
      background-color: ${colors.hover};
    }
  }
`;
