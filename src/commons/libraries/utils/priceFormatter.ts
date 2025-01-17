export const isBillion = (price: number): string => {
  const eok = Math.floor(price / 10000);
  console.log("eok: ", eok);
  if (eok === 0) {
    return "";
  }
  return `${eok}억`;
};
export const isTenMillion = (price: number): string => {
  const man = price % 10000;
  if (man === 0) {
    return "";
  }
  return `${man}만`;
};
