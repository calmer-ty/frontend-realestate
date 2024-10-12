import Link from "next/link";
import Image from "next/image";
// import LoadingSpinner from "../../../commons/loadingSpinner";
import BasicUnImage from "../../../commons/unImages/basic";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";

import type { IRecommendedListProps } from "../types";
import * as S from "./styles";

export default function RecommendedList({ firestoreDatas }: IRecommendedListProps): JSX.Element {
  const randomFirestores = firestoreDatas.sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <S.Container>
      {/* <div className="inner"> */}
      <div className="inner">
        <h2>추천드리는 매물입니다.</h2>
        {randomFirestores.length !== 0 ? (
          <S.RegisteredList>
            {randomFirestores.map((el) => (
              <li key={el._id}>
                <Link href={`/${el.type}/${el._id}`}>
                  {el.imageUrls?.[0] !== undefined ? (
                    <Image src={el.imageUrls?.[0] ?? "값 없음"} alt={el.type ?? "값 없음"} width={300} height={200} />
                  ) : (
                    <BasicUnImage width="300px" height="200px" fontSize="36px" />
                  )}
                  <p className="buildingDesc">
                    <span>
                      {el.type}・{el.addressDetail}
                    </span>
                    <strong>
                      매매 {isBillion(el.price ?? NaN)}
                      {isTenMillion(el.price ?? NaN)} 원
                    </strong>
                    <span>
                      {el.floor}층・{el.area}m²・관리비 {el.manageCost}만
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </S.RegisteredList>
        ) : (
          <div>추천드릴 매물이 없습니다</div>
          // <LoadingSpinner size={100} />
        )}
      </div>
      {/* </div> */}
    </S.Container>
  );
}
