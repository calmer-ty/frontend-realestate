import type { UseFormRegisterReturn } from "react-hook-form";

export interface IControlTextField {
  role: string;
  label: string;
  step?: string;
  type?: string;
  value?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
