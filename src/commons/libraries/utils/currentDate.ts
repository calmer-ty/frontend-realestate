export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth().toString().padStart(2, "0"); // 월을 두 자리로 포맷
  return `${year}${month}`;
};
