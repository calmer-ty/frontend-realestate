import type { UseFormRegisterReturn } from "react-hook-form";

export interface TextFieldReadOnlyProps {
  role: string;
  label: string;
  value: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}
