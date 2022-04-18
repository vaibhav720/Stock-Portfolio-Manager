import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
const app = firebase.initializeApp({
  apiKey: "AIzaSyAYbESiamh6AnajboPJGfvKlp-OtnELTLs",
  authDomain: "stock-portfolio-manager-ec897.firebaseapp.com",
  databaseURL: "https://stock-portfolio-manager-ec897-default-rtdb.firebaseio.com",
  projectId: "stock-portfolio-manager-ec897",
  storageBucket: "stock-portfolio-manager-ec897.appspot.com",
  messagingSenderId: "251876053864",
  appId: "1:251876053864:web:4d87dbee069db22f34bcdd",
  measurementId: "G-W19JMKNFZ2"
})
export const db = getFirestore(app);
export const auth =  app.auth();
export default app;