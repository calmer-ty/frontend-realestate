import type { ITitleUnderlineProps } from "./types";
import * as S from "./styles";

export default function TitleUnderline(props: ITitleUnderlineProps): JSX.Element {
  return (
    <S.TitleWrap>
      <h2>{props.label}</h2>
      <p>{props.desc}</p>
    </S.TitleWrap>
  );
}
