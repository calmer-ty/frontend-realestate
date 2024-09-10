import { TextField } from "@mui/material";
import type { IBasicTextField } from "./types";

export default function BasicTextField(props: IBasicTextField): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      InputProps={{ inputProps: { step: props.step } }}
      role={props.role}
      type={props.type}
      required={props.required}
      label={props.label}
      {...props.register}
      defaultValue={props.defaultValue}
      fullWidth
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
