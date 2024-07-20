import { TextField } from "@mui/material";
import type { ITextFieldBasic } from "./types";
import { style } from "./styles";

export default function TextFieldBasic(props: ITextFieldBasic): JSX.Element {
  return <TextField id="outlined-basic" style={style} role={props.role} required={props.required} label={props.label} {...props.register} value={props.value} />;
}
