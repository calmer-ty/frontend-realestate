import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Controller } from "react-hook-form";

import type { IControlRadioProps } from "./types";

export default function ControlRadio(props: IControlRadioProps): JSX.Element {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">{props.label}</FormLabel>
      <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.selectLabel1}
        render={({ field }) => (
          <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" {...field}>
            <FormControlLabel value={props.selectLabel1} control={<Radio />} label={props.selectLabel1} />
            <FormControlLabel value={props.selectLabel2} control={<Radio />} label={props.selectLabel2} />
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
