import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 40px 0;

  > ul {
    li {
      display: flex;
      column-gap: 10px;
    }
  }
`;
