const isBillion = (price: number): string => {
  const eok = Math.floor(price / 10000);

  if (eok === 0) {
    return "";
  }
  return `${eok}억`;
};
const isTenMillion = (price: number): string => {
  const man = price % 10000;
  if (man === 0) {
    return "";
  }
  return `${man}만`;
};

export const formatPrice = (price: number): string => {
  return `${isBillion(price)} ${isTenMillion(price)} 원`;
};
export const formatRent = (price: number): string => {
  return `${isBillion(price)} ${price % 10000 === 0 ? "" : price % 10000}`;
};

// 거래 방식에 따른 가격 표시법
export const getTransactionText = (transactionType: string, price: number, rent: number | null): string => {
  switch (transactionType) {
    case "월세":
      return `월세 ${formatRent(price)} / ${rent}`;
    case "전세":
      return `전세 ${formatPrice(price)}`;
    default:
      return `매매 ${formatPrice(price)}`;
  }
};
