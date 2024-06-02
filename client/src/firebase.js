import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-ecc42.firebaseapp.com",
  projectId: "blog-app-ecc42",
  storageBucket: "blog-app-ecc42.appspot.com",
  messagingSenderId: "704408071212",
  appId: "1:704408071212:web:46a8dd969816ca5c92b589"
};

export const app = initializeApp(firebaseConfig);