import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "alpacarnia.firebaseapp.com",
  projectId: "alpacarnia",
  storageBucket: "alpacarnia.appspot.com",
  messagingSenderId: "105500263278",
  appId: "1:105500263278:web:8d522a04ce98b25069377f",
};

export const app = initializeApp(firebaseConfig);
