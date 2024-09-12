import type { UseFormRegisterReturn } from "react-hook-form";

export interface IControlTextField {
  label: string;
  name: string;
  step?: string;
  type?: string;
  value?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
