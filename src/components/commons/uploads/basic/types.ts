import type { DocumentData } from "firebase/firestore";

export interface IFileWithPreview {
  file: File;
  previewUrl: string;
}
export interface IBasicUploadProps {
  docData?: DocumentData | undefined;
  onFilesChange: (files: File[]) => void;
}
