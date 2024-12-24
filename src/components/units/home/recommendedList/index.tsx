import ListItem from "./listItem";

import type { IRecommendedListProps } from "./types";
import * as S from "./styles";

export default function RecommendedList({ firestoreDatas }: IRecommendedListProps): JSX.Element {
  const randomFirestores = firestoreDatas.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <S.Container>
      <div className="inner">
        <h2>추천드리는 매물입니다.</h2>
        {randomFirestores.length !== 0 ? (
          <S.RegisteredList>
            {randomFirestores.map((el, index) => (
              <ListItem key={`${el._id}_${index}`} el={el} />
            ))}
          </S.RegisteredList>
        ) : (
          <div>추천드릴 매물이 없습니다</div>
        )}
      </div>
    </S.Container>
  );
}
