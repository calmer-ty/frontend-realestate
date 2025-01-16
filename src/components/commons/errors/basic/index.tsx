import * as S from "./styles";

interface IBasicErrorProps {
  text: string;
}

export default function BasicError(props: IBasicErrorProps): JSX.Element {
  return <S.Error>{props.text}</S.Error>;
}
