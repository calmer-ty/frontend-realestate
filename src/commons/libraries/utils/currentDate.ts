export const getCurrentDate = (): string => {
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth(); // 현재 월 (0부터 시작)

  // 1월이면 작년 12월로 설정
  if (month === 0) {
    year -= 1; // 작년
    month = 12; // 12월
  }

  // 월을 두 자리 문자열로 포맷
  const formattedMonth = month.toString().padStart(2, "0");
  return `${year}${formattedMonth}`;
};
