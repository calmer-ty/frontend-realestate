import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "../../commons/loadingSpinner";
import UnImageBasic from "../../commons/unImages/basic";
import { isBillion, isTenMillion } from "@/src/commons/libraries/utils/regex";
import type { IRecommendedListProps } from "./types";
import * as S from "./styles";

export default function RecommendedList({ firebaseDatas }: IRecommendedListProps): JSX.Element {
  const randomFirebaseDatas = firebaseDatas.sort(() => 0.5 - Math.random()).slice(0, 3);
  return (
    <S.Registered>
      <div className="inner">
        <h2>추천드리는 매물입니다.</h2>
        <div className="contents">
          {randomFirebaseDatas.length !== 0 ? (
            <S.RegisteredList>
              {randomFirebaseDatas.map((el) => (
                <li key={el._id}>
                  <Link href={`/${el.type}/${el._id}`}>
                    {el.imageUrls?.[0] !== undefined ? <Image src={el.imageUrls?.[0] ?? ""} alt={el.type} width={300} height={200} /> : <UnImageBasic width="300px" height="200px" fontSize="36px" />}
                    <p className="buildingDesc">
                      <span>
                        {el.type}・{el.addressDetail}
                      </span>
                      <strong>
                        매매 {isBillion(el.price)}
                        {isTenMillion(el.price)} 원
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
            <LoadingSpinner size={100} />
          )}
        </div>
      </div>
    </S.Registered>
  );
}
