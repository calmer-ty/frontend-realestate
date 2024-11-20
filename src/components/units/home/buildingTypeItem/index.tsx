import Link from "next/link";

import type { IBuildingTypeItemProps } from "../types";
import * as S from "./styles";

export default function BuildingTypeItem({ href, title, description, icon }: IBuildingTypeItemProps): JSX.Element {
  const isDisabled = href === undefined;

  return (
    <S.Container isDisabled={isDisabled} data-href={href}>
      {isDisabled ? (
        <div className="textWrap">
          <h2>{title}</h2>
          <p>준비 중</p>
          <div className="iconWrap">{icon}</div>
        </div>
      ) : (
        <Link href={`/${href}`}>
          <div className="textWrap">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="iconWrap">{icon}</div>
        </Link>
      )}
    </S.Container>
  );
}
