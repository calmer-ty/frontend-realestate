export const isBillion = (price: number): string => {
  return Math.floor(price / 10000) !== 0 ? `${Math.floor(price / 10000)}억` : "";
};
export const isTenMillion = (price: number): string => {
  return price % 10000 !== 0 ? `${price % 10000}만` : "";
};
