import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

export const Container = styled.div`
  display: flex;
  outline: 0.125rem solid #1976d2;
  border-radius: 0.25rem;
  background-color: ${colors.background};
  .MuiFormControl-root {
    justify-content: center;
    .MuiInputBase-root {
      .MuiSelect-select {
        font-weight: bold;
      }
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
