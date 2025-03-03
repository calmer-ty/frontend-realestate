import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import * as S from "./styles";
interface IHomeInfoProps {
  title: string;
  desc: string;
  href: string;
  cover: string;
}

export default function HomeInfo({ title, desc, href, cover }: IHomeInfoProps): JSX.Element {
  return (
    <S.Container cover={cover}>
      <Link href={href} target="_blank">
        <h4>{title}</h4>
        <p>{desc}</p>
        <span>
          {title} <ArrowForwardIcon fontSize="small" />
        </span>
      </Link>
    </S.Container>
  );
}
