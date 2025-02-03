// import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface IBasicToggleButtonProps {
  options: string[]; // options는 string 배열로 받음
  value: string | null;
  onChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => void;
}

export default function BasicToggleButton(props: IBasicToggleButtonProps): JSX.Element {
  const { options, value, onChange } = props;
  //   const [alignment, setAlignment] = useState<string | null>(options[0]);

  //   const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null): void => {
  //     setAlignment(newAlignment);
  //   };

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label="text alignment">
      {options.map((option) => (
        <ToggleButton key={option} value={option} aria-label={`${option}만 보기`} style={{ padding: "0 10px" }}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
