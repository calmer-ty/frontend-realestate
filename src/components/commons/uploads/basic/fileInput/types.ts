import type { Dispatch, RefObject, SetStateAction } from "react";
import type { IFileWithPreview } from "../types";

export interface IFileInputProps {
  filePreviews: IFileWithPreview[];
  setFilePreviews: Dispatch<SetStateAction<IFileWithPreview[]>>;
  onFilesChange: (files: File[]) => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  resetFileInput: (inputRef: RefObject<HTMLInputElement>) => void;
}
