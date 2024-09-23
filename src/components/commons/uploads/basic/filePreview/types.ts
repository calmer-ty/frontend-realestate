import type { IFiles } from "../types";

export interface IFilePreviewProps {
  fileUrls: string[];
  files: IFiles[];
  onRemoveFile: (index: number, type: "existing" | "new") => void;
}
