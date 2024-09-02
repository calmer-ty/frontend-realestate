import styled from "@emotion/styled";

export const VisibleArea = styled.article`
  height: 100%;
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
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  height: 100%;
  > p {
    text-align: center;
  }
`;
