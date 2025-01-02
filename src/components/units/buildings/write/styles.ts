import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 1024px;
  height: 100%;
  padding: 40px;
  > section {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    .inputUnit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;
      width: 100%;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  > button {
    width: 200px;
  }
`;
