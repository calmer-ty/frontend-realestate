interface ReduceOptions {
  useSpecialRules?: boolean;
}
interface FullNameOptions {
  useSpecialRules?: boolean;
}

export const getReduceCityName = (address: string, options: ReduceOptions = {}): string => {
  const result = address
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
    .replace(/경상남도/, "경남")

    .replace(/강원특별자치도/, "강원")
    .replace(/세종특별자치시/, "세종")
    .replace(/제주특별자치도/, "제주")
    .replace(/전북특별자치도/, "전북");

  // if (options.useSpecialRules !== undefined) {
  //   result = result
  //     .replace(/강원특별자치도/, "강원")
  //     .replace(/세종특별자치시/, "세종")
  //     .replace(/제주특별자치도/, "제주")
  //     .replace(/전북특별자치도/, "전북");
  // }
  return result;
};

export const getFullCityName = (address: string, options: FullNameOptions = {}): string => {
  const result = address
    .replace(/서울/, "서울특별시")
    .replace(/부산/, "부산광역시")
    .replace(/대구/, "대구광역시")
    .replace(/인천/, "인천광역시")
    .replace(/광주/, "광주광역시")
    .replace(/대전/, "대전광역시")
    .replace(/울산/, "울산광역시")
    .replace(/경기/, "경기도")
    .replace(/충북/, "충청북도")
    .replace(/충남/, "충청남도")
    .replace(/전남/, "전라남도")
    .replace(/경북/, "경상북도")
    .replace(/경남/, "경상남도")

    .replace(/강원/, "강원특별자치도")
    .replace(/세종/, "세종특별자치시")
    .replace(/제주/, "제주특별자치도")
    .replace(/전북/, "전북특별자치도");

  // if (options.useSpecialRules !== undefined) {
  //   result = result.replace(/강원/, "강원특별자치도").replace(/세종/, "세종특별자치시").replace(/제주/, "제주특별자치도").replace(/전북/, "전북특별자치도");
  // }
  return result;
};
