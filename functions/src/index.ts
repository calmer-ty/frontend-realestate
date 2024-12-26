import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import next from "next";

// Firebase Admin 초기화
admin.initializeApp();

// Firebase Functions 설정 가져오기
const functionsConfig = functions.config();
const NEXTAUTH_URL = functionsConfig.nextauth?.url;
const NEXTAUTH_SECRET = functionsConfig.nextauth?.secret;

console.log("NEXTAUTH_URL from Firebase Functions: ", NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET from Firebase Functions: ", NEXTAUTH_SECRET);

const isDev = process.env.NODE_ENV !== "production";
const nextServer = next({
  dev: isDev,
  conf: { distDir: ".next" },
});

const handle = nextServer.getRequestHandler();

export const nextjsFunc = functions.https.onRequest(async (req, res) => {
  try {
    // Firebase Functions 환경 변수 -> Node.js 환경 변수로 설정
    process.env.NEXTAUTH_URL = NEXTAUTH_URL;
    process.env.NEXTAUTH_SECRET = NEXTAUTH_SECRET;
    // Next.js 준비
    await nextServer.prepare();
    return handle(req, res);
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).send("Internal Server Error");
  }
});
