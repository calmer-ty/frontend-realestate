export interface IAutocompletePrimaryProps {
  label: string;
}

export interface IComboBoxControlProps extends IAutocompletePrimaryProps {
  onChange: (value: string | null) => void; // 콜백 함수 prop 추가
}
