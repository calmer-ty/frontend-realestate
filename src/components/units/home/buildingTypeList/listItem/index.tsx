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

export default function ListItem({ href, desc, icon, title, isDisabled }: IBuildingTypeListItemProps): JSX.Element {
  return (
    <S.ListItem isDisabled={isDisabled}>
      <Link href={href ?? ""}>
        <div className="textBox">
          <h2>{title}</h2>
          <div className="descWrap">
            <p>{desc}</p>
          </div>
        </div>
        <div className="iconWrap">{icon}</div>
      </Link>
    </S.ListItem>
  );
}
