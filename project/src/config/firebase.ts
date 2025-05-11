import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrrDkXi70FizXW3U-fus-mAWyZTlKfSzE",
  authDomain: "lang95.firebaseapp.com",
  projectId: "lang95",
  storageBucket: "lang95.firebasestorage.app",
  messagingSenderId: "826420633708",
  appId: "1:826420633708:web:1337c153c6126d48d33849",
  measurementId: "G-BQ02FCHPWL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
const analytics = getAnalytics(app);
