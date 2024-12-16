export const isBillion = (price: string | number): string => {
  const eok = Math.floor(Number(price) / 10000);
  if (eok === 0) {
    return "";
  }
  return `${eok}억`;
};
export const isTenMillion = (price: string | number): string => {
  const man = Number(price) % 10000;
  if (man === 0) {
    return "";
  }
  return `${man}만`;
};
