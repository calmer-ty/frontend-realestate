import { forwardRef, useState } from "react";

import { NumericFormat as _NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

import type { ChangeEvent } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
interface IFormattedInputsProps {
  label: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

const NumericFormat = forwardRef<HTMLInputElement, any>((props, ref) => <_NumericFormat {...props} customInput={TextField} thousandSeparator valueIsNumericString prefix="₩ " inputRef={ref} />);
NumericFormat.displayName = "NumericFormat"; // displayName 추가

export default function FormattedInputs({ required, label, register }: IFormattedInputsProps): JSX.Element {
  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(value);
  };

  return <NumericFormat value={value} onChange={handleChange} required={required} label={label} {...register} />;
}
