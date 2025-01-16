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

export default function ControlTextField(props: IControlTextField): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      type={props.type}
      required={props.required}
      label={props.label}
      {...props.register}
      value={props.value}
      fullWidth
      InputProps={{ inputProps: { step: props.step }, readOnly: props.readOnly }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
