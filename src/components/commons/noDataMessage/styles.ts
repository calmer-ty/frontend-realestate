import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.625rem;
  padding: 3.75rem 2.5rem;

  > p {
    max-width: 13.75rem;
    text-align: center;
    word-break: keep-all;
  }
`;
