// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseKey = process.env.NEXT_PUBLIC_FIREBASE_KEY;
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "frontend-teamproject.firebaseapp.com",
  projectId: "frontend-teamproject",
  storageBucket: "frontend-teamproject.appspot.com",
  messagingSenderId: "375412776453",
  appId: "1:375412776453:web:b4eb6e56b57ded3516866c",
  measurementId: "G-CT668326JT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(firebaseApp);
