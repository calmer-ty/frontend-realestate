import styled from "@emotion/styled";

export const Container = styled.article`
  /*tab 컴포넌트를 감싸는 상위 요소 */
  > div {
    display: flex;
    flex-direction: column;
    min-width: 340px;
  }

  h2 {
    margin-bottom: 20px;
  }
  h3 {
    font-size: 18px;
  }
`;
