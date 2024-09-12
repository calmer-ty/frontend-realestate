import { TextField } from "@mui/material";
import type { IBasicTextField } from "./types";

export default function BasicTextField(props: IBasicTextField): JSX.Element {
  const { label, name, type, required, step, register } = props;
  return (
    <TextField
      id="outlined-basic"
      name={name}
      type={type}
      required={required}
      label={label}
      // defaultValue={defaultValue}
      fullWidth
      {...register}
      InputProps={{ inputProps: { step } }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
