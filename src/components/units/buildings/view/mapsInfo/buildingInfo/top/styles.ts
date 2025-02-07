import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";

import { colors } from "@/src/commons/styles";

// 클릭 된 건물 상세 정보

export const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 15px;

  h2 {
    font-size: 24px;
    margin-right: 20px;
  }
  h3 {
    font-size: 16px;
  }
`;
export const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
export const TextWrap = styled.div`
  display: flex;
  column-gap: 4px;
  font-size: 14px;
  color: ${colors.blur};
  > span {
    line-height: 1.7;
  }
`;

export const SelectedContent = styled.div`
  padding: 20px;
  border: 1px solid ${colors.outline};
  border-radius: 10px;
  background-color: #fafafa;

  > p {
    font-size: 14px;
    color: ${colors.blur};
  }
`;

export const CloseButton = styled(CloseIcon)`
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
