import { TextField } from "@mui/material";
import type { UseFormRegisterReturn } from "react-hook-form";

interface TextFieldReadOnlyProps {
  role: string;
  label: string;
  value: string;
  // defaultValue: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

export default function TextFieldReadOnly(props: TextFieldReadOnlyProps): JSX.Element {
  return (
    <TextField
      id="outlined-read-only-input"
      label={props.label}
      role={props.role}
      value={props.value}
      // defaultValue={props.defaultValue}
      placeholder={props.placeholder}
      {...props.register}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
