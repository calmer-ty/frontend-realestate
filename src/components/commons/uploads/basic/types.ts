import type { Dispatch, SetStateAction } from "react";

export interface IFiles {
  file: File;
  fileUrl: string;
}
export interface IBasicUploadProps {
  imageUrls: string[] | undefined;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
}
