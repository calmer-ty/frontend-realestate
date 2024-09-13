import type { DocumentData } from "firebase/firestore";
import type { Dispatch, SetStateAction } from "react";

export interface IImgUploadProps {
  docData?: DocumentData | undefined;
  onFilesChange: Dispatch<SetStateAction<File[]>>;
}
