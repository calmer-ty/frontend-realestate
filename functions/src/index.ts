/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// 추가
import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import next from "next";

// 호스팅 파일 서빙
import express from "express";
import path from "path";

admin.initializeApp();

const isDev = process.env.NODE_ENV !== "production";
const nextServer = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const handle = nextServer.getRequestHandler();

// ===== 호스팅 파일 서빙 =====
// Express 앱 설정
const app = express();
// public 폴더에서 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));
// Next.js 핸들러 설정
app.all("*", (req, res) => handle(req, res));

export const nextjsFunc = onRequest(async (req, res) => {
  await nextServer.prepare();
  app(req, res);
});
