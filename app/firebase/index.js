// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = process.env.NEXT_PUBLIC_API_KEY_FIREBASE
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "fin-app-ae034.firebaseapp.com",
  projectId: "fin-app-ae034",
  storageBucket: "fin-app-ae034.appspot.com",
  messagingSenderId: "687981402472",
  appId: "1:687981402472:web:a625983345970cc409dedd",
  measurementId: "G-FBS8JZ7DB4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

