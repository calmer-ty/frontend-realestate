import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #1976d2;
  border-radius: 30px;
  background-color: #fff;
  .MuiFormControl-root {
    width: max-content;
    min-width: 100px;

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
