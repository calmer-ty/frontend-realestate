import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 30px;

  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}

  .itemImage {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    width: 200px;
    height: 120px;
  }

  .itemInfo {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    width: 250px;
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      margin-top: 4px;
      font-size: 20px;
    }
    .desc {
      color: #bcbcbc;
    }
  }

  .itemAd {
    h3 {
      margin-bottom: 5px;
      color: #454545;
    }

    background-color: #f9f9f9;
    padding: 10px 20px;
    color: #646464;
    .adEnd {
      color: #d83a4d;
    }
  }
`;
