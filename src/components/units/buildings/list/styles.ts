import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 60px 0;
  h2 {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
  }

  ul {
    overflow-y: hidden;
    overflow-y: scroll;
    display: flex;
    row-gap: 20px;
    flex-direction: column;
    min-width: 360px;
    height: calc(100vh - 220px);
  }
`;
