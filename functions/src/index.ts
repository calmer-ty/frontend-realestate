/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// // 추가적인 API 엔드포인트 예제
// export const greetUser = onRequest((request, response) => {
//   const name = request.query.name || "Guest"; // 쿼리 파라미터에서 name 가져오기
//   logger.info(`Greeting user: ${name}`, { structuredData: true });
//   response.send(`Hello, ${name}!`); // 인사 메시지 반환
// });

// // 숫자 더하기 엔드포인트
// export const addNumbers = onRequest((request, response) => {
//   const num1 = parseFloat(request.query.num1 as string);
//   const num2 = parseFloat(request.query.num2 as string);

//   if (isNaN(num1) || isNaN(num2)) {
//     response.status(400).send("Invalid numbers provided.");
//     return;
//   }

//   const sum = num1 + num2;
//   logger.info(`Adding numbers: ${num1} + ${num2} = ${sum}`, {
//     structuredData: true,
//   });
//   response.send(`The sum of ${num1} and ${num2} is ${sum}.`); // 합계 반환
// });

// 배포
export const testDistribution = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
