import styled from "@emotion/styled";

// 클릭 된 건물 상세 정보

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 367px);
  position: relative;
  border-top: 1px solid #dedede;

  .topMenu {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin: 10px 10px 0;
    h3 {
      font-size: 16px;
      > strong {
        color: #1976d2;
      }
    }
  }
`;

export const Registered = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
