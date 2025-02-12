import * as S from "./styles";

interface IBasicUnitProps {
  label: string;
}

export default function BasicUnit({ label }: IBasicUnitProps): JSX.Element {
  return <S.Unit>{label}</S.Unit>;
}
