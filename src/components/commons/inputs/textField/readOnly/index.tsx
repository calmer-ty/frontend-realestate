import { TextField } from "@mui/material";
import type { TextFieldReadOnlyProps } from "./types";

export default function TextFieldReadOnly(props: TextFieldReadOnlyProps): JSX.Element {
  return (
    <TextField
      id="outlined-read-only-input"
      role={props.role}
      required={props.required}
      label={props.label}
      value={props.value}
      {...props.register}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
