import { useFetchAsset } from "@/src/hooks/useFetchAsset";

import * as S from "./styles";

export default function AssetDetail(): JSX.Element {
  const { asset } = useFetchAsset();

  const calculateGrowth = (initialAmount: number, growthRate: number, years: number): number => {
    return initialAmount * Math.pow(1 + growthRate / 100, years);
  };

  return (
    <S.Container>
      원화 / 달러 / 금: {asset?.won}원 <br />
      주식 / ETF / 채권: {asset?.AS}원 <br />
      주식 / ETF / 채권 연간 상승률: {asset?.ASGrowth}% <br />
      연봉: {asset?.FA}원 <br />
      연봉 상승률: {asset?.FAGrowth}% <br />
      1년 뒤 금융자산 예상 : {calculateGrowth(asset?.AS ?? 0, asset?.ASGrowth ?? 0, 1)}
      <br />
      10년 뒤 금융자산 예상 : {calculateGrowth(asset?.AS ?? 0, asset?.ASGrowth ?? 0, 10)}
    </S.Container>
  );
}
