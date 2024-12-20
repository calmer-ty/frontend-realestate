export const handleError = (error: unknown, context?: string): never => {
  if (error instanceof Error) {
    console.error(`${context} - 에러 발생:`, error.message);
    throw new Error(`${context} - ${error.message}`);
  } else {
    console.error(`${context} - 예상치 못한 에러:`, error);
    throw new Error(`${context} - 알 수 없는 오류 발생`);
  }
};
