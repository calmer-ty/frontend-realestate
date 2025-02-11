import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  /*tab 컴포넌트를 감싸는 상위 요소 */
  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 16rem;
  }
`;
