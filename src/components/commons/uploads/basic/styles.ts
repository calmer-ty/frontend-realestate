import styled from "@emotion/styled";
import { Button } from "@mui/material";
import Image from "next/image";

export const FilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const PrevWrap = styled.div`
  width: 200px;
  height: 150px;
`;
export const UploadBtn = styled(Button)`
  width: 160px;
`;
export const PrevImg = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
