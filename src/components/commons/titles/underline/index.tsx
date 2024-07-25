import type { ITitleUnderlineProps } from "./types";
import * as S from "./styles";

export default function TitleUnderline(props: ITitleUnderlineProps): JSX.Element {
  return <S.Title>{props.label}</S.Title>;
}
