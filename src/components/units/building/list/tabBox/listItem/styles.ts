import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  border: 0.0625rem solid #e7e7e7;
`;

export const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 0.625rem;
  height: 3rem;
  padding: 0 1.25rem;
  background-color: rgb(240, 240, 240);

  .buttonWrap {
    display: flex;
    column-gap: 0.625rem;
  }
  > span {
    justify-self: flex-start;
  }
`;

export const ItemContents = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem 1.875rem;

  ${mediaQueries.tablet(css`
    flex-direction: column;
  `)}

  figure {
    position: relative;
    width: 11.5rem;
    height: 7.5rem;
  }

  .itemInfo {
    display: flex;
    flex-direction: column;
    row-gap: 0.25rem;
    width: 16rem;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      margin-top: 0.25rem;
      font-size: 1.25rem;
    }
    .desc {
      color: #bcbcbc;
    }
  }

  .itemAd {
    background-color: #f9f9f9;
    h3 {
      margin-bottom: 0.25rem;
      color: #454545;
    }
    padding: 0.625rem 1rem;
    color: #646464;
    .adEnd {
      color: #d83a4d;
    }
  }
`;
