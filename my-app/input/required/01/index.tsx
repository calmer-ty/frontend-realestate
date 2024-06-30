import { TextField } from "@mui/material";
import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputRequired01 {
  role: string;
  defaultValue: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function InputRequired01(props: IInputRequired01): JSX.Element {
  return (
    <TextField
      required
      id="outlined-required"
      label="Required"
      role={props.role}
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register}
    />
  );
}
