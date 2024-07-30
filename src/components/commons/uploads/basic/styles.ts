import styled from "@emotion/styled";
import type { CSSProperties } from "react";

export const FilePreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const PrevWrap = styled.div`
  width: 200px;
  height: 150px;
`;
export const inputStyles: CSSProperties = {
  width: "160px",
};
export const imageStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
