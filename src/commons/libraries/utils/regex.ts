export const divide10000 = (price: number): number => {
  return Math.floor(price / 10000);
};
export const remainder10000 = (price: number): number => {
  return price % 10000;
};
export const isBillion = (price: number): string => {
  return Math.floor(price / 10000) !== 0 ? `${Math.floor(price / 10000)}억` : "";
};
export const isTenMillion = (price: number): string => {
  return price % 10000 !== 0 ? `${price % 10000}만` : "";
};
interface ShortenOptions {
  useSpecialRules?: boolean;
}

export const shortenCityName = (address: string, options: ShortenOptions = {}): string => {
  let result = address
    .replace(/서울특별시/, "서울")
    .replace(/부산광역시/, "부산")
    .replace(/대구광역시/, "대구")
    .replace(/인천광역시/, "인천")
    .replace(/광주광역시/, "광주")
    .replace(/대전광역시/, "대전")
    .replace(/울산광역시/, "울산")
    .replace(/경기도/, "경기")
    .replace(/충청북도/, "충북")
    .replace(/충청남도/, "충남")
    .replace(/전라남도/, "전남")
    .replace(/경상북도/, "경북")
    .replace(/경상남도/, "경남");

  if (options.useSpecialRules !== undefined) {
    result = result
      .replace(/강원특별자치도/, "강원")
      .replace(/세종특별자치시/, "세종")
      .replace(/제주특별자치도/, "제주")
      .replace(/전북특별자치도/, "전북");
  }
  return result;
};
