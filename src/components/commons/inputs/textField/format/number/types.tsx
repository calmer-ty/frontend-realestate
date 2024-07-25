import type { UseFormRegisterReturn } from "react-hook-form";

export interface ICustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
export interface IFormatNumber {
  label: string;
  register?: UseFormRegisterReturn;
}
