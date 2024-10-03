import type { IWriteFormData } from "@/src/commons/types";
import type { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";

export interface IBuildingInfoProps {
  register: UseFormRegister<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  getValues: UseFormGetValues<IWriteFormData>;
  control: Control<IWriteFormData, any>;
}
