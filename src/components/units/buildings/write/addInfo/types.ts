import type { Control, UseFormRegister } from "react-hook-form";
import type { IWriteForm } from "@/src/commons/types";

export interface IAddInfoProps {
  register: UseFormRegister<IWriteForm>;
  control: Control<IWriteForm, any>;
}
