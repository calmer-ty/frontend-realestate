import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const List = styled.ul`
  li {
    border-bottom: 1px solid ${colors.outline};
    > a {
      display: flex;
      column-gap: 20px;
      padding: 20px;
      > img {
        object-fit: cover;
      }

      > p {
        display: flex;
        flex-direction: column;
      }
    }
    :hover {
      background-color: ${colors.hover};
    }
  }
`;
