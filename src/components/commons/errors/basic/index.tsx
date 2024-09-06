import type { IBasicErrorProps } from "./types";
import * as S from "./styles";

export default function BasicError(props: IBasicErrorProps): JSX.Element {
  return <S.Error>{props.text}</S.Error>;
}
