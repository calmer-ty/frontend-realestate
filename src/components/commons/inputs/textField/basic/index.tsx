import { TextField } from "@mui/material";
import type { ITextFieldBasic } from "./types";

export default function TextFieldBasic(props: ITextFieldBasic): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      // InputProps={{ inputProps: { step: "0.01" } }}
      InputProps={{ inputProps: { step: props.step } }}
      role={props.role}
      type={props.type}
      required={props.required}
      label={props.label}
      {...props.register}
      value={props.value}
      fullWidth
    />
  );
}
