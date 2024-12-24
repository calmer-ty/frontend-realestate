import type { IBuildingTypeListItemProps } from "../types";
import * as S from "./styles";

export default function ListItem(props: IBuildingTypeListItemProps): JSX.Element {
  return (
    <S.ListItem isDisabled={props.isDisabled}>
      <div className="textWrap">
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </div>
      <div className="iconWrap">{props.icon}</div>
    </S.ListItem>
  );
}
