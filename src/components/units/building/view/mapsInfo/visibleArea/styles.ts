import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.article`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const MarkerList = styled.ul`
  height: 100%;
  > li {
    padding: 0.625rem 1rem;
    border-bottom: 1px solid ${colors.outline};
    transition: background-color 200ms ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: ${colors.hover};
    }
  }
`;
