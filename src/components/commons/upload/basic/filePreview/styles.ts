import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const FilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  min-height: 9.375rem;
`;
export const PrevWrap = styled.div`
  position: relative;
  width: 12.5rem;
  height: 9.375rem;
`;

export const PrevCloseBtn = styled(Button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.875rem;
  height: 1.875rem;
  min-width: initial;
  background-color: #363636;
  color: #fff;

  &:hover {
    background-color: #a1a1a1;
  }
`;
