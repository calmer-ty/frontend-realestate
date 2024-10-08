import type { IWriteForm } from "@/src/commons/types";
import type { Control } from "react-hook-form";

export interface IControlSelect {
  label: string;
  notice: string;
  selecteItems: string[];
  required?: boolean;
  name: keyof IWriteForm;
  control: Control<IWriteForm>;
}
