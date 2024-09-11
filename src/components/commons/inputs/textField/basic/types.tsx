import type { UseFormRegisterReturn } from "react-hook-form";

export interface IBasicTextField {
  role: string;
  label: string;
  isEdit?: boolean;
  step?: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
