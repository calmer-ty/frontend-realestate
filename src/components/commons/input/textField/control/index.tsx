import { TextField } from "@mui/material";

import type { UseFormRegisterReturn } from "react-hook-form";
interface IControlTextField {
  label: string;
  step?: string;
  type?: string;
  value?: string;
  required?: boolean;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
}

export default function ControlTextField({ label, step, type, value, required, readOnly, register }: IControlTextField): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      type={type}
      required={required}
      label={label}
      {...register}
      value={value}
      fullWidth
      InputProps={{ inputProps: { step }, readOnly }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
