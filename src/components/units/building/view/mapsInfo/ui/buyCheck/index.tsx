import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";
import * as S from "./styles";

import type { IAssetForm, IGeocodeData } from "@/src/commons/types";
interface IBuyCheckProps {
  selectedData: IGeocodeData;
  asset: IAssetForm | undefined;
}
export default function BuyCheck({ selectedData, asset }: IBuyCheckProps): JSX.Element {
  const dealAmount = Number(selectedData.data.dealAmount);
  const currentCash = asset?.cash ?? NaN;
  const monthlySavings = asset?.SA ?? NaN;
  const monthlyInvestment = asset?.IA ?? NaN;
  const financialAssets = asset?.FA ?? NaN;
  const financialAssetsGrowth = asset?.FAGrowth ?? NaN;

  function timeToReachGoal(dealAmount: number, currentCash: number, monthlySavings: number, monthlyInvestment: number, financialAssets: number, financialAssetsGrowthRate: number): string {
    let totalAmount = currentCash;
    let months = 0;
    let years = 0;

    // 연 성장률을 복리로 적용하는 계산 함수
    const applyFinancialAssetsGrowth = (FA: number, FAGrowth: number, years: number): number => {
      return FA * Math.pow(1 + FAGrowth / 100, years); // 복리 계산
    };

    while (totalAmount < dealAmount) {
      years = Math.floor(months / 12); // 현재 몇 년이 지났는지
      const updatedFinancialAssets = applyFinancialAssetsGrowth(financialAssets, financialAssetsGrowth, years);
      // totalAmount += monthlySavings; // 매달 저축 금액을 더함
      totalAmount = updatedFinancialAssets + currentCash + monthlySavings * months + monthlyInvestment * months;

      // 매월 자산 변화 출력
      console.log(`월 ${months + 1}:`);
      console.log(`  현금 자산: ${currentCash}`);
      console.log(`  금융 자산 (복리 적용 후): ${updatedFinancialAssets}`);
      console.log(`  월 저축: ${monthlySavings * months}`);
      console.log(`  월 투자 금액: ${monthlyInvestment * months}`);
      console.log(`  총 자산: ${totalAmount}`);
      console.log(`--------------------`);

      months++; // 달 수를 하나씩 증가
    }

    // 월을 12로 나누어 년과 월로 변환
    const finalYears = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${finalYears}년 ${remainingMonths}개월`;
  }

  return (
    <S.Container>
      <h3>이 건물을 구매하는데 시간</h3>
      <ul>
        <li>
          <span className="title">건물 가격</span> <span>{formatPrice(Number(selectedData.data.dealAmount))}</span>
        </li>
        <li>
          <span className="title">현금 자산</span> <span>{formatPrice(asset?.cash ?? NaN)}</span>
        </li>
        <li>
          <span className="title">월 저축 금액</span> <span>{formatPrice(asset?.SA ?? NaN)}</span>
        </li>
        <li>
          <span className="title">금융 자산</span> <span>{formatPrice(asset?.FA ?? NaN)}</span>
        </li>
        <li>
          <span className="title">금융 상승률</span> <span>{formatPrice(asset?.FAGrowth ?? NaN)}</span>
        </li>
        <li>
          <span className="title">월 투자 금액</span> <span>{formatPrice(asset?.IA ?? NaN)}</span>
        </li>
        <li>얼마 걸리냐면 ... {timeToReachGoal(dealAmount, currentCash, monthlySavings, monthlyInvestment, financialAssets, financialAssetsGrowth)}</li>
      </ul>
    </S.Container>
  );
}
