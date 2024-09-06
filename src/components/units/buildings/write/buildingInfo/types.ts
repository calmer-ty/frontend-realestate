import type { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteFormData } from "../types";

export interface IBuildingInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  control: Control<IWriteFormData, any>;
}
