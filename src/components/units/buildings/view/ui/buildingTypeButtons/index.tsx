import { useState } from "react";

import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

import * as S from "./styles";
interface IControlRadioProps {
  label: string;
  name: string;
  selectLabels: string[];
}

export default function BuildingTypeButtons(props: IControlRadioProps): JSX.Element {
  const [value, setValue] = useState("아파트");

  const handleClick = (newValue: string): void => {
    setValue(newValue);
  };

  // 버튼 비활성화 조건
  const isDisabled = (label: string): boolean => {
    return label === "오피스텔" || label === "연립다세대"; // "주택" 또는 "오피스텔"일 때 비활성화
  };

  return (
    <S.Container>
      {props.selectLabels.map((label) => (
        <Button
          key={label}
          onClick={() => {
            handleClick(label);
          }} // 버튼 클릭 시 상태값 변경
          variant={value === label ? "contained" : "outlined"} // 선택된 버튼 스타일 다르게
          disabled={isDisabled(label)} // 특정 버튼을 비활성화
          startIcon={value === label ? <CheckIcon /> : null}
        >
          {label}
        </Button>
      ))}
    </S.Container>
  );
}
