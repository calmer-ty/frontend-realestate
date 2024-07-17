import { TextField } from "@mui/material";
import type { TextFieldReadOnlyProps } from "./types";
import { style } from "./styles";

export default function TextFieldReadOnly(props: TextFieldReadOnlyProps): JSX.Element {
  return (
    <TextField
      id="outlined-read-only-input"
      style={style}
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
