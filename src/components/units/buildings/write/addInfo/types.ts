import type { Control, UseFormRegister } from "react-hook-form";
import type { IEditFormData, IWriteFormData } from "../types";

export interface IAddInfoProps {
  register: UseFormRegister<IWriteFormData>;
  control: Control<IWriteFormData, any>;
  editData: IEditFormData;
}
