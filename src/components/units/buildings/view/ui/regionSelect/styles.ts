import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0.875rem;
  left: 50%;
  transform: translateX(-50%);
  border: 0.125rem solid #1976d2;
  border-radius: 1.875rem;
  background-color: #fff;
  .MuiFormControl-root {
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
