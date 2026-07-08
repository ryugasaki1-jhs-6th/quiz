import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyClUTXdRL6f2GXEQupozw2llOMGsulcx0k",
  authDomain: "quiz-f14a8.firebaseapp.com",
  projectId: "quiz-f14a8",
  storageBucket: "quiz-f14a8.firebasestorage.app",
  messagingSenderId: "473740494481",
  appId: "1:473740494481:web:f0fc4e892b94c942656130",
  measurementId: "G-YW47WK8L90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
