import { TextField } from "@mui/material";
import type { IReadOnlyTextFieldProps } from "./types";
import { style } from "./styles";

export default function ReadOnlyTextField(props: IReadOnlyTextFieldProps): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      style={style}
      role={props.role}
      required={props.required}
      label={props.label}
      // value={props.value}
      {...props.register}
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
