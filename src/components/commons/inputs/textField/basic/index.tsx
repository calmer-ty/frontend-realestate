import { TextField } from "@mui/material";
import type { IBasicTextField } from "./types";

export default function BasicTextField(props: IBasicTextField): JSX.Element {
  return (
    <TextField
      id="outlined-basic"
      type={props.type}
      required={props.required}
      label={props.label}
      fullWidth
      {...props.register}
      InputProps={{ inputProps: { step: props.step } }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
