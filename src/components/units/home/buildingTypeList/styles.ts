import styled from "@emotion/styled";

// 지도 선택 버튼
export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  position: relative;

  ::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff url("/images/main.jpg") no-repeat center/cover;
    opacity: 0.2;
  }
  .inner {
    display: flex;
    justify-content: space-between;
    width: 1024px;
  }
`;
