import type { UseFormRegisterReturn } from "react-hook-form";

export interface IBasicTextField {
  role: string;
  label: string;
  step?: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
