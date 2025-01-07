import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 10px;
  height: 48px;
  padding: 0 20px;
  background-color: #fafafa;
  .buttonWrap {
    display: flex;
    column-gap: 10px;
  }
  > span {
    justify-self: flex-start;
  }
`;
