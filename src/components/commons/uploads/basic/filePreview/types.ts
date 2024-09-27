import type { IFiles } from "../types";

export interface IFilePreviewProps {
  pendingFiles: IFiles[];
  imageUrls: string[];
  onRemoveFile: (index: number, type: "url" | "file") => void;
}
