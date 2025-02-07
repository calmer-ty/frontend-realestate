import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const ListItem = styled.li`
  padding: 10px 15px;
  border-bottom: 1px solid ${colors.outline};
  cursor: pointer;
  > h2 {
    font-size: 20px;
  }
  &:hover {
    background-color: ${colors.hover};
  }
`;
