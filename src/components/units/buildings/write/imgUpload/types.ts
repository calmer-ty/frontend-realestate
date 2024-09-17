import type { IFirestoreData } from "@/src/commons/types";
import type { Dispatch, SetStateAction } from "react";

export interface IImgUploadProps {
  docData?: IFirestoreData | undefined;
  onFilesChange: Dispatch<SetStateAction<File[]>>;
}
