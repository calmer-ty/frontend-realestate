import { formatPrice } from "@/src/commons/libraries/utils/priceFormatter";
import * as S from "./styles";

import type { IAssetForm, IGeocodeData } from "@/src/commons/types";
import { useEffect, useState } from "react";
interface IBuyCheckProps {
  selectedData: IGeocodeData;
  asset: IAssetForm | undefined;
}
export default function BuyCheck({ selectedData, asset }: IBuyCheckProps): JSX.Element {
  const dealAmount = Number(selectedData.data.dealAmount);
  const cash = asset?.cash ?? NaN;
  const monthlySavings = asset?.monthlySavings ?? NaN;
  const monthlyInvestment = asset?.monthlyInvestment ?? NaN;
  const investmentAssets = asset?.investmentAssets ?? NaN;
  const investmentAssetsGrowthRate = asset?.investmentAssetsGrowthRate ?? NaN;

  // ✅ `years` 상태 관리
  const [yearsToGoal, setYearsToGoal] = useState<string | null>(null);

  const calculateTimeToGoal = (dealAmount: number, cash: number, monthlySavings: number, monthlyInvestment: number, investmentAssets: number, investmentAssetsGrowthRate: number): string => {
    let years = 0;
    const MAX_YEARS = 100; // 무한 루프 방지

    // 연간 저축 & 투자
    const annualSavings = monthlySavings * 12;
    const annualInvestment = monthlyInvestment * 12;
    const realEstateGrowthRate = 5; // 고정 5% 부동산 성장률

    let totalCash = cash; // 저축을 통해 증가하는 현금 자산
    console.log("totalCash: ", totalCash);
    let totalinvestmentAssets = investmentAssets; // 복리 적용되는 금융 자산
    let goalAmount = dealAmount; // 초기 부동산 가치, 목표 금액과 같다고 가정

    while (totalCash + totalinvestmentAssets < goalAmount) {
      if (years > MAX_YEARS) {
        return "목표 달성이 어려움 (100년 이상 걸림)"; // 100년 이상이면 목표 불가능
      }
      years++; // 1년 단위 증가
      // 1년치 금융 자산 복리 계산 (연 단위)
      totalinvestmentAssets = (totalinvestmentAssets + annualInvestment) * (1 + investmentAssetsGrowthRate / 100);

      // 현금 자산(저축)은 단순 합산
      totalCash += annualSavings;

      // 부동산 가치 복리 계산 (연 단위)
      goalAmount = goalAmount * (1 + realEstateGrowthRate / 100);
      // console.log(`연도: ${years}, 현금: ${totalCash}, 금융 자산: ${totalinvestmentAssets}, 총 자산: ${totalCash + totalinvestmentAssets} 목표 금액: ${goalAmount}`);
    }
    return `약 ${years}년`;
  };

  // ✅ `useEffect`로 값 변경될 때만 업데이트
  useEffect(() => {
    const result = calculateTimeToGoal(dealAmount, cash, monthlySavings, monthlyInvestment, investmentAssets, investmentAssetsGrowthRate);
    setYearsToGoal(result);
  }, [dealAmount, cash, monthlySavings, monthlyInvestment, investmentAssets, investmentAssetsGrowthRate]);
  console.log("yearsToGoal: ", yearsToGoal);

  return (
    <S.Container>
      <h3></h3>
      <ul>
        <li>
          <span className="title">건물 가격</span> <span>{formatPrice(dealAmount)}</span>
        </li>
        <li>
          <span className="title">현금 자산</span> <span>{formatPrice(cash)}</span>
        </li>
        <li>
          <span className="title">월 저축 금액</span> <span>{formatPrice(monthlySavings)}</span>
        </li>
        <li>
          <span className="title">투자 자산</span> <span>{formatPrice(investmentAssets)}</span>
        </li>
        <li>
          <span className="title">투자 자산 상승률 (연)</span> <span>{investmentAssetsGrowthRate} %</span>
        </li>
        <li>
          <span className="title">월 투자 금액</span> <span>{formatPrice(monthlyInvestment)}</span>
        </li>
        <li>
          <span className="title">매물 가격 상승률 (연)</span> <span>5 %</span>
        </li>
        <li className={yearsToGoal === "목표 달성이 어려움 (100년 이상 걸림)" ? "long" : ""}>
          <span className="title">구매 가능한 시기:</span>
          <span>{calculateTimeToGoal(dealAmount, cash, monthlySavings, monthlyInvestment, investmentAssets, investmentAssetsGrowthRate)}</span>
        </li>
      </ul>
    </S.Container>
  );
}
