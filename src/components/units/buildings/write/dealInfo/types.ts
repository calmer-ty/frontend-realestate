import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteFormData } from "../types";
import type { DocumentData } from "firebase/firestore";

export interface IDealInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  docData?: DocumentData | undefined;
}
