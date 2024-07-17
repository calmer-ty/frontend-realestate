import type { UseFormRegisterReturn } from "react-hook-form";

export interface ISelectBasic {
  label: string;
  required?: boolean;
  register?: UseFormRegisterReturn;

  // 부모로 보내는 타입
  onChange: (selectedValue: string) => void;
  value: string;
}
