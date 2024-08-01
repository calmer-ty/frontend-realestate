import styled from "@emotion/styled";

export const Container = styled.article`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 100%;
  width: 100%;
  padding: 40px;
  max-width: 1024px;
`;
export const ImgContainer = styled.section`
  display: flex;
  width: 100%;
  height: 440px;
`;
export const ImgWrap = styled.figure`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr; /* 4개의 열 정의 */
  grid-template-rows: 1fr 1fr; /* 2개의 행 정의 */
  gap: 10px; /* 항목 사이의 간격 */
  gap: 10px;
  > img {
    display: block;
    position: static !important;
    object-fit: cover;
  }
  > img:first-child {
    grid-column: span 2; /* 2열 차지 (50%) */
    grid-row: span 2; /* 2행 차지 */
  }
  > img:not(:first-child) {
    grid-column: span 1; /* 하나의 열 차지 */
    grid-row: span 1; /* 하나의 행 차지 */
  }
`;
export const BuildingInfo = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px;
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoContent = styled.ul`
  > li {
    display: flex;
    h3 {
      width: 150px;
      font-size: 16px;
    }
  }
  > li + li {
    margin-top: 10px;
  }
`;
