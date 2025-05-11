import styled from "@emotion/styled";
import { colors } from "@/src/commons/styles";

// 지도 선택 버튼
export const Container = styled.section`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex: 1.4;

  .row-item {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;
    a {
      width: 100%;
      height: 100%;
      padding: 1rem 3rem 1rem 1.5rem;
      border-radius: 0.75rem;
      border: 0.125rem solid ${colors.outline};
      background: white no-repeat right 20px bottom 20px/2rem;
      transition: background-color 0.3s ease-in-out;
      /* 이미지 */
      &.link-1 {
        background-image: url("/images/icon_apt.png");
      }
      &.link-2 {
        background-image: url("/images/icon_office.png");
      }
      &.link-3 {
        background-image: url("/images/icon_house.png");
      }
      &.link-4 {
        background-image: url("/images/icon_houseContract.png");
      }
      &.link-5 {
        background-image: url("/images/icon_houseSale.png");
      }
      &:hover {
        background-color: ${colors.cover};
      }
      h2 {
        margin-bottom: 0.5rem;
        font-weight: bold;
        font-size: 1.25rem;
      }
      p {
        word-break: keep-all;
        color: gray;
      }
    }
  }
`;
