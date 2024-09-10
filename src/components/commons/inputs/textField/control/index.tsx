import { TextField } from "@mui/material";
import type { IControlTextField } from "./types";

export default function ControlTextField(props: IControlTextField): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      InputProps={{ inputProps: { step: props.step } }}
      role={props.role}
      type={props.type}
      required={props.required}
      label={props.label}
      {...props.register}
      value={props.value}
      fullWidth
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
