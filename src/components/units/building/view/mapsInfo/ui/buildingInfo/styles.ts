import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { colors } from "@/src/commons/styles";

// 클릭 된 건물 상세 정보

export const Basic = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  padding: 0.875rem;

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-right: 1.25rem;
  }
`;
export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.625rem;

  h3 {
    font-size: 1rem;
    font-weight: bold;
  }
`;
export const TextWrap = styled.div`
  display: flex;
  column-gap: 0.25rem;
  color: ${colors.normal};
`;

export const SelectedContent = styled.div`
  padding: 1rem;
  border: 0.0625rem solid ${colors.outline};
  border-radius: 0.625rem;
  background-color: #fafafa;

  > p {
    color: ${colors.normal};
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  padding: 0;
  min-width: 1.875rem;
  cursor: pointer;
`;

// Listing
export const Listing = styled.section`
  display: flex;
  flex-direction: column;
  border-top: 0.0625rem solid ${colors.outline};
  flex: 1;

  .topMenu {
    display: flex;
    flex-direction: column;
    row-gap: 0.625rem;
    padding: 0.875rem 0.875rem 0;
    h3 {
      > strong {
        color: #1976d2;
      }
    }
  }
  .bottomContents {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
`;

export const MatchedList = styled.ul`
  width: 100%;
  height: 100%;
  li {
    border-bottom: 0.0625rem solid ${colors.outline};

    > a {
      display: flex;
      column-gap: 1.25rem;
      padding: 1.25rem;
      transition: background-color 100ms ease-in-out;

      figure {
        position: relative;
        width: 8.75rem;
        height: 8.75rem;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          transition: background-color 100ms ease-in-out;
        }
      }

      .buildingInfo {
        display: flex;
        flex-direction: column;
      }

      /* hover */
      &:hover {
        background-color: ${colors.hover};

        figure::after {
          background-color: ${colors.cover};
        }
      }
    }
  }
`;
