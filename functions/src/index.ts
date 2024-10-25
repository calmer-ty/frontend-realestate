/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// 추가
import next from "next";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// 추가
const nextjsServer = next({
  dev: false, // 배포 환경에서는 false로 설정
  conf: { distDir: ".next" }, // Next.js 빌드 파일 디렉토리
});

const handle = nextjsServer.getRequestHandler();

export const nextjsFunc = onRequest((req, res) => {
  return nextjsServer.prepare().then(() => handle(req, res));
});
