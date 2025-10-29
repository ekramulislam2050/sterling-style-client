// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPA04UAm0CGpdolV8k7mTg8S0VJQE-3_M",
  authDomain: "sterling-style-client.firebaseapp.com",
  projectId: "sterling-style-client",
  storageBucket: "sterling-style-client.firebasestorage.app",
  messagingSenderId: "671904554105",
  appId: "1:671904554105:web:d75d4bf1031f37ba8488a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth