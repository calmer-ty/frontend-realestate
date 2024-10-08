import type { Control, UseFormGetValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";

export interface IBuildingInfoProps {
  register: UseFormRegister<IWriteForm>;
  setValue: UseFormSetValue<IWriteForm>;
  getValues: UseFormGetValues<IWriteForm>;
  control: Control<IWriteForm, any>;
}
