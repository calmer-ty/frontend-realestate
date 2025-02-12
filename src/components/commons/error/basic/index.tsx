import * as S from "./styles";

interface IBasicErrorProps {
  text: string;
}

export default function BasicError({ text }: IBasicErrorProps): JSX.Element {
  return <S.Error>{text}</S.Error>;
}
