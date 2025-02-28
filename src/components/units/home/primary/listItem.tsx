import Link from "next/link";

import * as S from "./styles";

import type { ReactNode } from "react";
interface IBuildingTypeListItemProps {
  href?: string;
  icon: ReactNode;
  title: string;
  isDisabled: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function ListItem({ href, icon, title, isDisabled, onMouseEnter, onMouseLeave }: IBuildingTypeListItemProps): JSX.Element {
  return (
    <S.ListItem isDisabled={isDisabled} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link href={href ?? ""}>
        <div className="textBox">
          <h2>{title}</h2>
        </div>
        <div className="iconWrap">{icon}</div>
      </Link>
    </S.ListItem>
  );
}
