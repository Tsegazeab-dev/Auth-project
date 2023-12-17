// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-app-b2412.firebaseapp.com",
  projectId: "auth-app-b2412",
  storageBucket: "auth-app-b2412.appspot.com",
  messagingSenderId: "320399834581",
  appId: "1:320399834581:web:f0ed2a422cc4065edd915c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);