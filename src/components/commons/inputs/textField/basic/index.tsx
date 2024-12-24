import { TextField } from "@mui/material";
import type { IBasicTextField } from "./types";

export default function BasicTextField(props: IBasicTextField): JSX.Element {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    // 값이 0으로 시작하는 경우 제거
    if (value.startsWith("0") && value.length > 1) {
      e.target.value = value.replace(/^0+/, ""); // 0으로 시작하면 0을 제거
    }
  };

  return (
    <TextField
      id="outlined-basic"
      type={props.type}
      required={props.required}
      label={props.label}
      fullWidth
      onInput={handleInput} // onInput 이벤트로 처리
      {...props.register}
      InputProps={{
        inputProps: {
          step: props.step,
          min: 1,
        },
      }}
      InputLabelProps={{
        shrink: true, // label이 항상 위에 위치하도록 설정
      }}
    />
  );
}
