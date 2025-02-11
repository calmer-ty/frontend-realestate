import styled from "@emotion/styled";

export const Container = styled.article`
  height: 100%;
  /*tab 컴포넌트를 감싸는 상위 요소 */
  > div {
    display: flex;
    flex-direction: column;
    min-width: 22.5rem;
    height: 100%;
  }

  h2 {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
  }
`;
