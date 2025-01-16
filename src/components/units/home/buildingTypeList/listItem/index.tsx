import Link from "next/link";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBuildingTypeListItemProps {
  href?: string;
  desc: string;
  icon: ReactNode;
  title: string;
  isDisabled: boolean;
}

export default function ListItem(props: IBuildingTypeListItemProps): JSX.Element {
  return (
    <S.ListItem isDisabled={props.isDisabled}>
      <Link href={props.href ?? ""}>
        <div className="textWrap">
          <h2>{props.title}</h2>
          <p>{props.desc}</p>
        </div>
        <div className="iconWrap">{props.icon}</div>
      </Link>
    </S.ListItem>
  );
}
