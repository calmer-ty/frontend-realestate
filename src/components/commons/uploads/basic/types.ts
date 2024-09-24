import type { IFirestoreData } from "@/src/commons/types";

export interface IFiles {
  file: File;
  fileUrl: string;
}
export interface IBasicUploadProps {
  docData?: IFirestoreData | undefined;
  setSelectedFiles: (files: File[]) => void;
}
