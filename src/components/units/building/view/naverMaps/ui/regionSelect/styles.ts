import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  outline: 0.125rem solid #1976d2;
  border-radius: 0.25rem;
  background-color: white;
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
