import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import type { IComboBoxControlProps } from "./types";
import { style } from "./styles";

const options = ["아파트", "준비중"];

export default function ComboBoxControl(props: IComboBoxControlProps): JSX.Element {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: any, newValue: string | null): void => {
    setValue(newValue); // 기존 코드
    props.onChange(newValue); // 부모 컴포넌트로 새로운 값 전달
  };

  return (
    <Autocomplete
      style={style}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
      {...props.register}
    />
  );
}
