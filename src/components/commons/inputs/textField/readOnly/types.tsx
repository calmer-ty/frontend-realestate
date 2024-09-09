import type { UseFormRegisterReturn } from "react-hook-form";

export interface IReadOnlyTextFieldProps {
  role: string;
  label: string;
  value: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
