// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "alpacarnia.firebaseapp.com",
  projectId: "alpacarnia",
  storageBucket: "alpacarnia.appspot.com",
  messagingSenderId: "105500263278",
  appId: "1:105500263278:web:8d522a04ce98b25069377f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
