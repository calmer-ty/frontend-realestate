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
  const monthlySavings = asset?.monthlySavings ?? NaN;
  const monthlyInvestment = asset?.monthlyInvestment ?? NaN;
  const investmentAssets = asset?.investmentAssets ?? NaN;
  const investmentAssetsGrowthRate = asset?.investmentAssetsGrowthRate ?? NaN;

  function timeToReachGoal(dealAmount: number, currentCash: number, monthlySavings: number, monthlyInvestment: number, investmentAssets: number, investmentAssetsGrowthRate: number): string {
    let years = 0;

    // 연간 저축 & 투자
    const annualSavings = monthlySavings * 12;
    const annualInvestment = monthlyInvestment * 12;
    const realEstateGrowthRate = 5; // 고정 5% 부동산 성장률

    let totalCash = currentCash; // 저축을 통해 증가하는 현금 자산
    let totalinvestmentAssets = investmentAssets; // 복리 적용되는 금융 자산
    let goalAmount = dealAmount; // 초기 부동산 가치, 목표 금액과 같다고 가정

    while (totalCash + totalinvestmentAssets < goalAmount) {
      years++; // 1년 단위 증가
      // 1년치 금융 자산 복리 계산 (연 단위)
      totalinvestmentAssets = (totalinvestmentAssets + annualInvestment) * (1 + investmentAssetsGrowthRate / 100);

      // 현금 자산(저축)은 단순 합산
      totalCash += annualSavings;

      // 부동산 가치 복리 계산 (연 단위)
      goalAmount = goalAmount * (1 + realEstateGrowthRate / 100);
      // console.log(`연도: ${years}, 현금: ${totalCash}, 금융 자산: ${totalinvestmentAssets}, 총 자산: ${totalCash + totalinvestmentAssets} 목표 금액: ${goalAmount}`);
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
          <span className="title">월 저축 금액</span> <span>{formatPrice(asset?.monthlySavings ?? NaN)}</span>
        </li>
        <li>
          <span className="title">투자 자산</span> <span>{formatPrice(asset?.investmentAssets ?? NaN)}</span>
        </li>
        <li>
          <span className="title">투자 자산 상승률 (연)</span> <span>{asset?.investmentAssetsGrowthRate ?? NaN} %</span>
        </li>
        <li>
          <span className="title">월 투자 금액</span> <span>{formatPrice(asset?.monthlyInvestment ?? NaN)}</span>
        </li>
        <li>
          <span className="title">매물 가격 상승률 (연)</span> <span>5 %</span>
        </li>
        <li>
          <span className="title">구매 가능한 시기:</span> 약 {timeToReachGoal(dealAmount, currentCash, monthlySavings, monthlyInvestment, investmentAssets, investmentAssetsGrowthRate)}
        </li>
      </ul>
    </S.Container>
  );
}
