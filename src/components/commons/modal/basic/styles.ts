import styled from "@emotion/styled";

export const Box = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  background-color: #fff;
  border: 2px solid #000;
  padding: 40px 32px 32px;

  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;
