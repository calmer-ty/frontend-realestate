import * as S from "./styles";

interface IBasicUnitProps {
  label: string;
}

export default function BasicUnit(props: IBasicUnitProps): JSX.Element {
  return <S.Unit>{props.label}</S.Unit>;
}
