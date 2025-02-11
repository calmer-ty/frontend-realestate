import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  .inner {
    display: flex;
    flex-direction: column;
    min-width: 22.5rem;
    > h2 {
      margin-bottom: 1.25rem;
      ${mediaQueries.mobile(css`
        text-align: center;
      `)}
    }
    .slick-dots {
      bottom: -1.875rem;
    }
  }
`;

export const ListItem = styled.div`
  width: 16rem;
  margin: 0 auto;

  a {
    display: flex;
    flex-direction: column;
    row-gap: 0.625rem;
    position: relative;

    .imgWrap {
      position: relative;
      width: 16rem;
      height: 12rem;

      /* 이미지 랩 */
      > img,
      div {
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
    }

    /* buildingDesc */
    > p.buildingDesc {
      display: flex;
      flex-direction: column;
      > strong {
        font-size: 1.25rem;
        margin-bottom: 0.625rem;
      }
    }
    :hover {
      ::before {
        display: block;
      }
    }
  }
`;
