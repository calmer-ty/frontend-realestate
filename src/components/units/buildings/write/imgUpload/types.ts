import type { Dispatch, SetStateAction } from "react";

export interface IImgUploadProps {
  onFilesChange: Dispatch<SetStateAction<File[]>>;
}
