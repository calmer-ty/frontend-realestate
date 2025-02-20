import { useUserStatus } from "@/src/hooks/useUserStatus";

import * as S from "./styles";

export default function UserStatusDetail(): JSX.Element {
  const { userStatus } = useUserStatus();

  const calculateGrowth = (initialAmount: number, growthRate: number, years: number): number => {
    return initialAmount * Math.pow(1 + growthRate / 100, years);
  };

  return (
    <S.Container>
      원화 / 달러 / 금: {userStatus?.won}원 <br />
      주식 / ETF / 채권: {userStatus?.AS}원 <br />
      주식 / ETF / 채권 연간 상승률: {userStatus?.ASGrowth}% <br />
      연봉: {userStatus?.FA}원 <br />
      연봉 상승률: {userStatus?.FAGrowth}% <br />
      1년 뒤 금융자산 예상 : {calculateGrowth(userStatus?.AS ?? 0, userStatus?.ASGrowth ?? 0, 1)}
      <br />
      10년 뒤 금융자산 예상 : {calculateGrowth(userStatus?.AS ?? 0, userStatus?.ASGrowth ?? 0, 10)}
    </S.Container>
  );
}
