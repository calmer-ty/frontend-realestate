import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${colors.outline};

  .topMenu {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 10px 10px 0;
    h3 {
      font-size: 16px;
      > strong {
        color: #1976d2;
      }
    }
  }
  .bottomContents {
    position: relative;
    min-height: 240px;
  }
`;
