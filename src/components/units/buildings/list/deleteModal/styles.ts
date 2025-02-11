import styled from "@emotion/styled";

export const ModalInner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 0.625rem;
  padding: 0;
  .top {
    display: flex;
    flex-direction: column;
    row-gap: 0.375rem;

    p {
      word-break: keep-all;
    }
  }
  .buttonWrap {
    display: flex;
    justify-content: flex-end;
    column-gap: 0.625rem;
  }
`;
