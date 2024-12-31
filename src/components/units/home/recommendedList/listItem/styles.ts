import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const ListItem = styled.div`
  width: 300px;
  ${mediaQueries.tablet(css`
    width: 240px;
  `)}
  ${mediaQueries.mobile(css`
    width: 300px;
  `)}
  a {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    position: relative;

    /* 이미지 랩 */
    > img {
      object-fit: cover;
      ${mediaQueries.tablet(css`
        width: 100%;
      `)}
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
  ${mediaQueries.desktop(css`
    margin: 0 auto;
  `)}
`;
