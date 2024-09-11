import type { Control, UseFormRegister } from "react-hook-form";
import type { IWriteFormData } from "../types";
import type { DocumentData } from "firebase/firestore";

export interface IAddInfoProps {
  register: UseFormRegister<IWriteFormData>;
  control: Control<IWriteFormData, any>;
  isEdit: boolean;
  docData?: DocumentData | undefined;
}
