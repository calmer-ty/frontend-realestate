import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
`;
export const Visible = styled.section`
  > ul {
    > li {
      padding: 10px 15px;
      border-bottom: 1px solid #dedede;
      > h2 {
        font-size: 20px;
      }
    }
  }
`;
export const UnVisible = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 210px;
  row-gap: 10px;
  > p {
    text-align: center;
  }
`;
