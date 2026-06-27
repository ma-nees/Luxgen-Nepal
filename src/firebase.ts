import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS4yFO4ME6BrcYHde8RAESJsax0Q45M7I",
  authDomain: "luxgen-nepal.firebaseapp.com",
  projectId: "luxgen-nepal",
  storageBucket: "luxgen-nepal.firebasestorage.app",
  messagingSenderId: "155932924792",
  appId: "1:155932924792:web:11bef1be1912f8c400068d",
  measurementId: "G-MW95BKE9HF",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
