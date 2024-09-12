import type { Dispatch, RefObject, SetStateAction } from "react";

export interface IFileInputProps {
  onFilesChange: (files: File[]) => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  resetFileInput: (inputRef: RefObject<HTMLInputElement>) => void;
}
