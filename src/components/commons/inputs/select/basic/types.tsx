// import type { UseFormRegisterReturn } from "react-hook-form";

import type { Control } from "react-hook-form";
import type { IWriteFormData } from "@/src/components/units/buildings/write/types";

export interface ISelectBasic {
  label: string;
  required?: boolean;
  name: keyof IWriteFormData;
  control: Control<IWriteFormData>;
  // register?: UseFormRegisterReturn;

  // 부모로 보내는 타입
  // onChange: (selectedValue: string) => void;
  // value: string;
}
