import type { IErrorBasicProps } from "./types";
import * as S from "./styles";

export default function ErrorBasic(props: IErrorBasicProps): JSX.Element {
  return <S.Error>{props.text}</S.Error>;
}
