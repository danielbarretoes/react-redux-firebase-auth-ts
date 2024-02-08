// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  // Your Firebase Config
  apiKey: "AIzaSyANfpisf-eyD4x9sEvdV7mHAa0JCcaiXHs",
  authDomain: "danielbarretoes-dev.firebaseapp.com",
  projectId: "danielbarretoes-dev",
  storageBucket: "danielbarretoes-dev.appspot.com",
  messagingSenderId: "918270738588",
  appId: "1:918270738588:web:7445502b2c00bddf07ad59",
  measurementId: "G-13TR8T9KL5",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
