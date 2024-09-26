import type { IFiles } from "../types";

export interface IFilePreviewProps {
  pendingFiles: IFiles[];
  previewFileUrls: string[];
  onRemoveFile: (index: number, type: "url" | "file") => void;
}
