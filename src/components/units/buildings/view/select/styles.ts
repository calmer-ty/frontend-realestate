import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  border: 2px solid #1976d2;
  border-radius: 30px;
  background-color: #fff;

  .MuiFormControl-root {
    width: max-content;
    min-width: 100px;
    .MuiInputBase-root {
      font-weight: 500;
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
