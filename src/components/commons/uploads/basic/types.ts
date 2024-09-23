import type { IFirestoreData } from "@/src/commons/types";

export interface IFiles {
  file: File;
  previewUrl: string;
}
export interface IBasicUploadProps {
  docData?: IFirestoreData | undefined;
  onFilesChange: (files: File[]) => void;
}
