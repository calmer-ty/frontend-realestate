import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

interface IAutocompletePrimaryProps {
  label: string;
}

const options = ["아파트", "준비중"];

export default function ComboBoxControl(props: IAutocompletePrimaryProps): JSX.Element {
  const [value, setValue] = useState<string | null>(options[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    // <div>
    //   <div>{`value: ${value !== null ? `'${value}'` : "null"}`}</div>
    //   <div>{`inputValue: '${inputValue}'`}</div>
    //   <br />
    <Autocomplete
      value={value}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
    // </div>
  );
}
