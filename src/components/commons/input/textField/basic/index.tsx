import { TextField } from "@mui/material";

import type { UseFormRegisterReturn } from "react-hook-form";
interface IBasicTextField {
  label: string;
  type?: string;
  step?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  // isEdit?: boolean;
  // defaultValue?: string;
  // readOnly?: boolean;
}

export default function BasicTextField({ label, type, step, required, register }: IBasicTextField): JSX.Element {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    // 값이 0으로 시작하는 경우 제거
    if (value.startsWith("0") && value.length > 1) {
      e.target.value = value.replace(/^0+/, ""); // 0으로 시작하면 0을 제거
    }
  };

  return (
    <TextField
      id="outlined-basic"
      type={type}
      required={required}
      label={label}
      fullWidth
      onInput={handleInput} // onInput 이벤트로 처리
      {...register}
      InputProps={{
        inputProps: {
          step,
        },
      }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
