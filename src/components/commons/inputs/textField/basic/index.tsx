import { TextField } from "@mui/material";
import type { ITextFieldBasic } from "./types";
import { style } from "./styles";

export default function TextFieldBasic(props: ITextFieldBasic): JSX.Element {
  return <TextField id="outlined-basic" role={props.role} style={style} type={props.type} InputProps={{ inputProps: { step: "0.01" } }} required={props.required} label={props.label} {...props.register} value={props.value} />;
}
