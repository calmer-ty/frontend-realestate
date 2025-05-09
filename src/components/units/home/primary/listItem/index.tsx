import Link from "next/link";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBuildingTypeListItemProps {
  href?: string;
  icon: ReactNode;
  title: string;
  desc: string;
  target: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ListItem({ href, icon, title, desc, target, onMouseEnter, onMouseLeave }: IBuildingTypeListItemProps): JSX.Element {
  return (
    <S.ListItem onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link href={href ?? ""} target={target} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <h2>{title}</h2>
        <span>{desc}</span>
        <div className="iconWrap">{icon}</div>
      </Link>
    </S.ListItem>
  );
}
