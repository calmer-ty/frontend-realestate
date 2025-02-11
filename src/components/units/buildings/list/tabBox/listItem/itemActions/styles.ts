import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.625rem;
  height: 3rem;
  padding: 0 1.25rem;
  background-color: #fafafa;
  .buttonWrap {
    display: flex;
    column-gap: 0.625rem;
  }
  > span {
    justify-self: flex-start;
  }
`;
