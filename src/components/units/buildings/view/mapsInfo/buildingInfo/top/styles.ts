import styled from "@emotion/styled";
import { Button } from "@mui/material";

import { colors } from "@/src/commons/styles";

// 클릭 된 건물 상세 정보

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  padding: 0.875rem;

  h2 {
    margin-right: 1.25rem;
  }
`;
export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.625rem;
`;
export const TextWrap = styled.div`
  display: flex;
  column-gap: 0.25rem;
  color: ${colors.blur};
`;

export const SelectedContent = styled.div`
  padding: 1.25rem;
  border: 0.0625rem solid ${colors.outline};
  border-radius: 0.625rem;
  background-color: #fafafa;

  > p {
    color: ${colors.blur};
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
