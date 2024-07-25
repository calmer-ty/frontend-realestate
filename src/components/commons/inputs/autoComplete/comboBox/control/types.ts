import type { UseFormRegisterReturn } from "react-hook-form";

export interface IComboBoxControlProps {
  label: string;
  register?: UseFormRegisterReturn;
}

// export interface IComboBoxControlProps extends IAutocompletePrimaryProps {
//   onChange: (value: string | null) => void; // 콜백 함수 prop 추가
// }
