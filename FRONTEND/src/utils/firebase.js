// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration



const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  apiKey : "AIzaSyDdMCF__OMHs7xrtzHRzfP4OmCvLtMpRjw",
  authDomain: "ai-interview-agent-84b74.firebaseapp.com",
  projectId: "ai-interview-agent-84b74",
  storageBucket: "ai-interview-agent-84b74.firebasestorage.app",
  messagingSenderId: "818635065335",
  appId: "1:818635065335:web:dcfa83be270ab5eb0f90f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export{auth ,provider}