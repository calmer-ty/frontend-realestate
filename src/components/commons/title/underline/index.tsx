import * as S from "./styles";

export interface IUnderlineTitleProps {
  label: string;
  desc?: string;
}

export default function UnderlineTitle({ label, desc }: IUnderlineTitleProps): JSX.Element {
  return (
    <S.TitleWrap>
      <h2>{label}</h2>
      <p>{desc}</p>
    </S.TitleWrap>
  );
}
