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
// const analytics = getAnalytics(firebaseApp);
