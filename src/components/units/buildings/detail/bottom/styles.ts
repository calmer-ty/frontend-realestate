import styled from "@emotion/styled";
import { mediaQueries } from "@/src/commons/styles";
import { css } from "@emotion/react";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;

  ${mediaQueries.mobile(css`
    padding: 1.25rem;
  `)}
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
`;
export const InfoList = styled.ul`
  > li {
    display: flex;
    h3 {
      width: 8rem;
    }
    span {
      flex: 1;
    }
  }
  > li + li {
    margin-top: 0.625rem;
  }
`;
