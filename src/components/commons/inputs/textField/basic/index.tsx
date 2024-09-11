import { TextField } from "@mui/material";
import type { IBasicTextField } from "./types";

export default function BasicTextField(props: IBasicTextField): JSX.Element {
  const { step, type, required, label, register, defaultValue, isEdit } = props;
  return (
    <TextField
      id="outlined-basic"
      InputProps={{ inputProps: { step } }}
      type={type}
      required={required}
      label={label}
      {...register}
      defaultValue={defaultValue}
      fullWidth
      InputLabelProps={{
        shrink: isEdit, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
