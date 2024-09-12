import type { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteFormData } from "../types";
import type { DocumentData } from "firebase/firestore";

export interface IAddInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  docData?: DocumentData | undefined;
  control: Control<IWriteFormData, any>;
}
