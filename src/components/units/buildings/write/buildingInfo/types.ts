import type { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteFormData } from "../types";
import type { DocumentData } from "firebase/firestore";

export interface IBuildingInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  control: Control<IWriteFormData, any>;
  isEdit: boolean;
  docData?: DocumentData | undefined;
}
