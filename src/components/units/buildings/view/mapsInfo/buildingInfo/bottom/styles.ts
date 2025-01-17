import styled from "@emotion/styled";

// 클릭 된 건물 상세 정보

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 367px);
  position: relative;
`;

export const Registered = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  border-top: 1px solid #dedede;
  > h3 {
    font-size: 16px;
    margin: 10px 20px;
    > strong {
      color: #1976d2;
    }
  }
`;
