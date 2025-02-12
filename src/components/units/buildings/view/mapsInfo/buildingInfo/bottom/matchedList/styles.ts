import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const List = styled.ul`
  width: 100%;
  height: 100%;
  li {
    border-bottom: 0.0625rem solid ${colors.outline};
    > a {
      display: flex;
      column-gap: 1.25rem;
      padding: 1.25rem;
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
