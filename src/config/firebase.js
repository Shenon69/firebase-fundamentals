// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsbPbbHs4wuCXRpio2tBLwmcLCpHn3usY",
  authDomain: "fir-basics-4a385.firebaseapp.com",
  projectId: "fir-basics-4a385",
  storageBucket: "fir-basics-4a385.appspot.com",
  messagingSenderId: "850758618279",
  appId: "1:850758618279:web:0a1adfde356684a61e5f82",
  measurementId: "G-MH2E93B1NG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
