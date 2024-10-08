import type { IWriteForm } from "@/src/commons/types";
import type { Control } from "react-hook-form";

export interface IControlRadioProps {
  label: string;
  name: keyof IWriteForm;
  selectLabel1: string;
  selectLabel2: string;
  control: Control<IWriteForm>;
}
