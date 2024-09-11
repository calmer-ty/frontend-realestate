import type { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IEditFormData, IWriteFormData } from "../types";

export interface IAddInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  control: Control<IWriteFormData, any>;
  editData: IEditFormData;
}
