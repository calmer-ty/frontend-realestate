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
  return `${isBillion(price)} ${isTenMillion(price)}원`;
};
