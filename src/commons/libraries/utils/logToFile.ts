import { appendFileSync } from "fs";

// 로그를 파일에 기록하는 함수
export const logToFile = (message: string): void => {
  const logMessage = `${new Date().toISOString()} - ${message}\n`; // 로그에 타임스탬프 추가
  appendFileSync("log.txt", logMessage); // 'log.txt' 파일에 추가
};
