import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 0.0625rem solid ${colors.outline};
  flex: 1;

  .topMenu {
    display: flex;
    flex-direction: column;
    row-gap: 0.625rem;
    padding: 0.875rem 0.875rem 0;
    h3 {
      > strong {
        color: #1976d2;
      }
    }
  }
  .bottomContents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
`;
