import type { IFileWithPreview } from "../types";

export interface IFilePreviewListProps {
  filePreviews: IFileWithPreview[];
  onRemoveFile: (index: number) => void;
}
