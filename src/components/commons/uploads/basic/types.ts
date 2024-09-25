import type { IFirestoreData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IFiles {
  file: File;
  fileUrl: string;
}
export interface IBasicUploadProps {
  docData?: IFirestoreData | undefined;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setuploadedFileUrls: Dispatch<SetStateAction<string[]>>;
}
