import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  justify-content: center;
  align-items: center;
  flex: 1;

  ul {
    width: 19rem;
    padding: 1rem;
    border-radius: 1rem;
    li {
      padding: 1.25rem 0;
      border-top: 0.0625rem solid ${colors.blur};
      .title {
        display: inline-block;
        width: 9rem;
        font-weight: bold;
      }
      &.long {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
