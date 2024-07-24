import { Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { ISelectBasic } from "./types";
import { style } from "./styles";

const options = ["아파트"];

export default function SelectControl(props: ISelectBasic): JSX.Element {
  return (
    <FormControl fullWidth required={props.required}>
      <InputLabel style={style.label} id="demo-simple-select-label">
        {props.label}
      </InputLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue=""
        render={({ field }) => (
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label={props.label} {...field}>
            <MenuItem value="">
              <em>매물 유형을 선택하세요</em>
            </MenuItem>
            {options.map((el, index) => (
              <MenuItem key={`${el}_${index}`} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
