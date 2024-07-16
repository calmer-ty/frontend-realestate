import { TextField } from "@mui/material";
import type { ITextFieldBasic } from "./types";

export default function TextFieldBasic(props: ITextFieldBasic): JSX.Element {
  return <TextField id="outlined-basic" role={props.role} required={props.required} label={props.label} {...props.register} />;
}
