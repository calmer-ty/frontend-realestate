import type { UseFormRegisterReturn } from "react-hook-form";

export interface IBasicTextField {
  label: string;
  type?: string;
  isEdit?: boolean;
  step?: string;
  defaultValue?: string;
  required?: boolean;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
}
