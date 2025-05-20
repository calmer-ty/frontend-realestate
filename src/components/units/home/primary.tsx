import Link from "next/link";
import { motion } from "framer-motion";
import * as S from "./styles";

interface IMotionLinkProps {
  href: string;
  className?: string;
  title: string;
  description: string;
}

export default function Primary(): JSX.Element {
  return (
    <S.Primary>
      <div className="flex flex-col justify-between gap-4 h-70 mx-20">
        <div className="row-item">
          <MotionLink href="/apartment/" className="link-1" title="아파트" description="매물을 실거래가 정보와 함께 지도에서 확인해보세요!" />
          <MotionLink href="/officetel/" className="link-2" title="오피스텔" description="편리한 교통과 다양한 오피스텔 매물을 실거래가로 알아보세요." />
          <MotionLink href="/familyHousing/" className="link-3" title="빌라" description="저렴한 가격대의 빌라 매물을 위치와 실거래가로 비교해보세요." />
        </div>
        <div className="row-item">
          <MotionLink href="https://apply.lh.or.kr/lhapply/main.do#gnrlPop/" className="link-4" title="청약" description="최신 아파트 청약 일정과 조건을 빠르게 확인하세요!" />
          <MotionLink href="https://www.reby24.com/" className="link-5" title="분양" description="신규 아파트 및 오피스텔 분양 정보를 한눈에 찾아보세요." />
        </div>
      </div>
    </S.Primary>
  );
}

function MotionLink({ href, className, title, description }: IMotionLinkProps): JSX.Element {
  const MLink = motion(Link);
  return (
    <MLink
      href={href}
      className={`p-6 bg-white rounded-xl shadow-md ${className}`}
      aria-label="juicy_fish"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 break-all">{description}</p>
    </MLink>
  );
}
