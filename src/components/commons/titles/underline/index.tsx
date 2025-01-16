import * as S from "./styles";

export interface IUnderlineTitleProps {
  label: string;
  desc?: string;
}

export default function UnderlineTitle(props: IUnderlineTitleProps): JSX.Element {
  return (
    <S.TitleWrap>
      <h2>{props.label}</h2>
      <p>{props.desc}</p>
    </S.TitleWrap>
  );
}
