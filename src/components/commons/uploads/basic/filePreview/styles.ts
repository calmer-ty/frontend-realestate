import styled from "@emotion/styled";

export const FilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 150px;
`;
export const PrevWrap = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
`;

export const PrevCloseBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: #363636;
  color: #fff;
`;
