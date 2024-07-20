import type { UseFormRegisterReturn } from "react-hook-form";

export interface ITextFieldBasic {
  role: string;
  label: string;
  value?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
