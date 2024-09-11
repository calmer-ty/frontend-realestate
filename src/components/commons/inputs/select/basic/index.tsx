import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { Controller } from "react-hook-form";
import { InputLabel } from "@mui/material";
import { engToKor } from "@/src/commons/libraries/utils/convertCollection";
import type { IControlSelect } from "./types";

export default function BasicSelect(props: IControlSelect): JSX.Element {
  const { label, notice, selecteItems, required, type } = props;

  return (
    <FormControl fullWidth required={required}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>

      <Select labelId="demo-simple-select-label" id="demo-simple-select" label={label} value={engToKor(type)}>
        <MenuItem value="">
          <em>{notice}</em>
        </MenuItem>
        {selecteItems.map((el, index) => (
          <MenuItem key={`${el}_${index}`} value={el}>
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
