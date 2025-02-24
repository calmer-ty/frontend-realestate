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
  const financialAssetsGrowthRate = asset?.FAGrowth ?? NaN;

  function timeToReachGoal(dealAmount: number, currentCash: number, monthlySavings: number, monthlyInvestment: number, financialAssets: number, financialAssetsGrowthRate: number): string {
    let years = 0;

    // 연간 저축 & 투자
    const annualSavings = monthlySavings * 12;
    const annualInvestment = monthlyInvestment * 12;
    const realEstateGrowthRate = 5; // 고정 5% 부동산 성장률

    let totalCash = currentCash; // 저축을 통해 증가하는 현금 자산
    let totalFinancialAssets = financialAssets; // 복리 적용되는 금융 자산
    let goalAmount = dealAmount; // 초기 부동산 가치, 목표 금액과 같다고 가정

    while (totalCash + totalFinancialAssets < goalAmount) {
      years++; // 1년 단위 증가
      // 1년치 금융 자산 복리 계산 (연 단위)
      totalFinancialAssets = (totalFinancialAssets + annualInvestment) * (1 + financialAssetsGrowthRate / 100);

      // 현금 자산(저축)은 단순 합산
      totalCash += annualSavings;

      // 부동산 가치 복리 계산 (연 단위)
      goalAmount = goalAmount * (1 + realEstateGrowthRate / 100);
      // console.log(`연도: ${years}, 현금: ${totalCash}, 금융 자산: ${totalFinancialAssets}, 총 자산: ${totalCash + totalFinancialAssets} 목표 금액: ${goalAmount}`);
    }
    return `${years}년`;
  }

  return (
    <S.Container>
      <h3></h3>
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
          <span className="title">금융 상승률</span> <span>{asset?.FAGrowth ?? NaN} %</span>
        </li>
        <li>
          <span className="title">월 투자 금액</span> <span>{formatPrice(asset?.IA ?? NaN)}</span>
        </li>
        <li>
          <span className="title">매물 가격 상승률 (연)</span> <span>5 %</span>
        </li>
        <li>
          <span className="title">구매 가능한 시기:</span> 약 {timeToReachGoal(dealAmount, currentCash, monthlySavings, monthlyInvestment, financialAssets, financialAssetsGrowthRate)}
        </li>
      </ul>
    </S.Container>
  );
}
