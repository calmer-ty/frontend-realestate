import type { Control } from "react-hook-form";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

export interface ISelectControl {
  label: string;
  notice: string;
  selecteItems: string[];
  required?: boolean;
  name: keyof IWriteFormData;
  control: Control<IWriteFormData>;
}
