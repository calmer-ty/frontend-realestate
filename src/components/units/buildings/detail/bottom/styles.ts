import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 40px;

  ${mediaQueries.mobile(css`
    padding: 20px;
  `)}
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;
export const InfoList = styled.ul`
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
