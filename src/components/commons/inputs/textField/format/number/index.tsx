import { forwardRef, useState } from "react";
import { NumericFormat, type NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import type { ICustomProps, IFormatNumber } from "./types";

const NumericFormatCustom = forwardRef<NumericFormatProps, ICustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      prefix=""
    />
  );
});

export default function FormatNumber(props: IFormatNumber): JSX.Element {
  const [values, setValues] = useState({
    numberformat: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <TextField
      name="numberformat"
      id="formatted-numberformat-input"
      label={props.label}
      value={values.numberformat}
      onChange={handleChange}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
      }}
      {...props.register}
      fullWidth
    />
  );
}
