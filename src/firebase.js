// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD9-q5UGq1Zqc3vXz20xGC3uQEcRFe7yL8",
  authDomain: "hatespeechdetection-22a24.firebaseapp.com",
  projectId: "hatespeechdetection-22a24",
  storageBucket: "hatespeechdetection-22a24.appspot.com",
  messagingSenderId: "752755850531",
  appId: "1:752755850531:web:0493a900ea395d11372096",
  measurementId: "G-8BEGM7LBEV"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
