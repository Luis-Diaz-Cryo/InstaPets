
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const firebaseConfig = {
  apiKey: "AIzaSyBzcUtXWej_TFg4lVt6bO1xUu3A4OOIP2w",
  authDomain: "instapets-fdc6a.firebaseapp.com",
  projectId: "instapets-fdc6a",
  storageBucket: "instapets-fdc6a.appspot.com",
  messagingSenderId: "1071715437991",
  appId: "1:1071715437991:web:612ce4a51ae7b66fb1fa82",
  measurementId: "G-8B9RB20MKN"
};


export const app = initializeApp(firebaseConfig);
export const dbInstance = getFirestore(app);
