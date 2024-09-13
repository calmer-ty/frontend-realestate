import type { DocumentData } from "firebase/firestore";
import type { IFileWithPreview } from "../types";

export interface IFilePreviewListProps {
  docData?: DocumentData | undefined;
  filePreviews: IFileWithPreview[];
  onRemoveFile: (index: number) => void;
}
