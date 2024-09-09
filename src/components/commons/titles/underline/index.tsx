import type { IUnderlineTitleProps } from "./types";
import * as S from "./styles";

export default function UnderlineTitle(props: IUnderlineTitleProps): JSX.Element {
  return (
    <S.TitleWrap>
      <h2>{props.label}</h2>
      <p>{props.desc}</p>
    </S.TitleWrap>
  );
}
