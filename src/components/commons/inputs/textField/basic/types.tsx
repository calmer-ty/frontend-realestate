import type { UseFormRegisterReturn } from "react-hook-form";

export interface ITextFieldBasic {
  type?: string;
  role: string;
  label: string;
  value?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
