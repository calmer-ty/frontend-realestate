import type { IFirestoreData } from "@/src/commons/types";

export interface IFileWithPreview {
  file: File;
  previewUrl: string;
}
export interface IBasicUploadProps {
  docData?: IFirestoreData | undefined;
  onFilesChange: (files: File[]) => void;
}
