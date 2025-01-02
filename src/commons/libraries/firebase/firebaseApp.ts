// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // getStorage 함수 추가
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseKey = process.env.FIREBASE_KEY;

const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "frontend-realestate.firebaseapp.com",
  projectId: "frontend-realestate",
  storageBucket: "frontend-realestate.appspot.com",
  messagingSenderId: "681330247558",
  appId: "1:681330247558:web:0931630a2e8e4963480e07",
  measurementId: "G-G7K9SCF8MW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // 스토리지 초기화

// Firebase 인증 인스턴스 가져오기
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider };

// const analytics = getAnalytics(firebaseApp);
