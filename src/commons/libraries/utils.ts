export const isBillion = (amount: number): number => {
  return Math.floor(amount / 10000);
};
export const isTenMillion = (amount: number): number => {
  return amount % 10000;
};
