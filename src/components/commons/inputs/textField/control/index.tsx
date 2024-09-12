import { TextField } from "@mui/material";
import type { IControlTextField } from "./types";

export default function ControlTextField(props: IControlTextField): JSX.Element {
  const { type, required, label, register, value, step } = props;
  return (
    <TextField
      id="outlined-basic"
      type={type}
      required={required}
      label={label}
      {...register}
      value={value}
      fullWidth
      InputProps={{ inputProps: { step } }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
