import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  width: 100%;
  height: 100%;

  ${mediaQueries.mobile(css`
    flex-direction: column-reverse;
  `)}
`;
export const MapsLink = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px;
  border-right: 1px solid #dedede;
  > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70px;
    height: 64px;
    padding: 10px;
    border-radius: 6px;
    span {
      font-size: 12px;
    }

    &.active {
      background-color: #f6fafd;
      border: 1px solid #1976d2;
      color: #1976d2;
    }
    &:hover {
      background-color: #f6fafd;
    }
  }
`;

export const MapMenu = styled.div`
  padding: 6px 10px;
  border-bottom: 1px solid #dedede;
`;
