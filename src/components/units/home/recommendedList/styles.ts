import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  height: 50%;

  .inner {
    flex-direction: column;
    > h2 {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .contents {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
  }

  ${mediaQueries.mobile(css`
    display: none !important;
  `)}
`;
export const RegisteredList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > li {
    > a {
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      position: relative;
      /* 이미지 랩 */
      > img {
        object-fit: cover;
      }
      ::before {
        content: "";
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #000;
        opacity: 0.3;
        z-index: 1;
      }

      > p.buildingDesc {
        display: flex;
        flex-direction: column;
        > strong {
          font-size: 20px;
          margin-bottom: 10px;
        }
      }
      :hover {
        ::before {
          display: block;
        }
      }
    }
  }
`;
