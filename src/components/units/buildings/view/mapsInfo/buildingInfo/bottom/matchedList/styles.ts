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
      transition: background-color 100ms ease-in-out;

      figure {
        position: relative;
        width: 8.75rem;
        height: 8.75rem;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          transition: background-color 100ms ease-in-out;
        }
      }

      .buildingInfo {
        display: flex;
        flex-direction: column;
      }

      /* hover */
      &:hover {
        background-color: ${colors.hover};

        figure::after {
          background-color: ${colors.cover};
        }
      }
    }
  }
`;
