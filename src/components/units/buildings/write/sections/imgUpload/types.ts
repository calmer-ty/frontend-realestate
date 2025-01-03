import type { Dispatch, SetStateAction } from "react";

export interface IImgUploadProps {
  imageUrls: string[] | undefined;
  setSelectedFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedImageUrls: Dispatch<SetStateAction<string[]>>;
}
