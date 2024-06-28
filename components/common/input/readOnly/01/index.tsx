import { TextField } from "@mui/material";
import type { UseFormRegisterReturn } from "react-hook-form";

interface IInputReadOnly01 {
  defaultValue: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function InputReadOnly01(props: IInputReadOnly01): JSX.Element {
  return (
    <TextField
      id="outlined-read-only-input"
      // label="Read Only"
      defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
