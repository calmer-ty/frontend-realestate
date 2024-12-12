export const isBillion = (price: string | number): string => {
  const eok = Math.floor(Number(price) / 10000);
  return `${eok}억`;
};
export const isTenMillion = (price: string | number): string => {
  const man = Number(price) % 10000;
  return `${man}만`;
};
// export const formatPrice = (price: number): string => {
//   const eok = Math.floor(price / 10000); // 억 단위
//   const man = price % 10000; // 만 단위

//   // 억과 만 단위가 모두 있을 경우
//   let result = "";
//   if (eok !== 0) result += `${eok}억`;
//   if (man !== 0) result += `${man}만`;

//   return result ?? "0원"; // 0일 경우 "0원" 반환
// };
