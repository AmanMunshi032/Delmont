// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTGQ_qgb4MiMmqWksmw-PlG5qxjycL_VI",
  authDomain: "delmont-7434c.firebaseapp.com",
  projectId: "delmont-7434c",
  storageBucket: "delmont-7434c.firebasestorage.app",
  messagingSenderId: "824468294945",
  appId: "1:824468294945:web:54559a132805e497168260",
  measurementId: "G-DWRV3LG9S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);  