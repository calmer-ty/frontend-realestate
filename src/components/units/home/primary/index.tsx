import Link from "next/link";
import * as S from "./styles";

export default function HomePrimary(): JSX.Element {
  return (
    <S.Container>
      <div className="flex flex-col justify-between gap-4 h-100 m-10">
        <div className="row-item">
          <Link href="/apartment" className="link-1" aria-label="juicy_fish">
            <h2>아파트</h2>
            <p>매물을 실거래가 정보와 함께 지도에서 확인해보세요!</p>
          </Link>
          <Link href="/officetel" className="link-2" aria-label="juicy_fish">
            <h2>오피스텔</h2>
            <p>편리한 교통과 다양한 오피스텔 매물을 실거래가로 알아보세요.</p>
          </Link>
          <Link href="/familyHousing" className="link-3" aria-label="juicy_fish">
            <h2>빌라</h2>
            <p>저렴한 가격대의 빌라 매물을 위치와 실거래가로 비교해보세요.</p>
          </Link>
        </div>
        <div className="row-item">
          <Link href="https://apply.lh.or.kr/lhapply/main.do#gnrlPop" className="link-4" target="_blank" aria-label="juicy_fish">
            <h2>청약</h2>
            <p>최신 아파트 청약 일정과 조건을 빠르게 확인하세요!</p>
          </Link>
          <Link href="https://www.reby24.com/" className="link-5" target="_blank" aria-label="juicy_fish">
            <h2>분양</h2>
            <p>신규 아파트 및 오피스텔 분양 정보를 한눈에 찾아보세요.</p>
          </Link>
        </div>
      </div>
    </S.Container>
  );
}
