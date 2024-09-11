import type { Control, UseFormSetValue } from "react-hook-form";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

export interface IControlRadioProps {
  label: string;
  name: keyof IWriteFormData;
  selectLabel1: string;
  selectLabel2: string;
  control: Control<IWriteFormData>;
  setValue: UseFormSetValue<IWriteFormData>;
  hasValue: string;
}
