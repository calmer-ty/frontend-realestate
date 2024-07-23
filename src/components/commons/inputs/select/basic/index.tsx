import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { ISelectBasic } from "./types";
import type { SelectChangeEvent } from "@mui/material/Select";
import { style } from "./styles";

const options = ["아파트"];

export default function SelectBasic(props: ISelectBasic): JSX.Element {
  const [type, setType] = useState("");

  const handleChange = (event: SelectChangeEvent): void => {
    const selectedValue = event.target.value;
    setType(selectedValue);
    props.onChange(selectedValue); // 선택된 값 부모 컴포넌트로 전달
  };

  return (
    <FormControl fullWidth required={props.required}>
      <InputLabel style={style.label} id="demo-simple-select-label">
        {props.label}
      </InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} label="type" onChange={handleChange}>
        <MenuItem value="">
          <em>매물 유형을 선택하세요</em>
        </MenuItem>
        {options.map((el, index) => {
          return (
            <MenuItem key={`${el}_${index}`} value={el}>
              {el}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
