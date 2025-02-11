import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const List = styled.ul`
  height: 100%;
  > li {
    padding: 0.625rem 1rem;
    border-bottom: 1px solid ${colors.outline};
    cursor: pointer;

    &:hover {
      background-color: ${colors.hover};
    }
  }
`;
