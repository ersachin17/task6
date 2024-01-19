import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC03yzyOdTf5LTo_b9wCnx_MPvXwkYzbfU",
  authDomain: "fir-auth-11-83041.firebaseapp.com",
  projectId: "fir-auth-11-83041",
  storageBucket: "fir-auth-11-83041.appspot.com",
  messagingSenderId: "370474540843",
  appId: "1:370474540843:web:27d98a27a2898fb9c3ef6e",
  measurementId: "G-940JE89W98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {app, auth, db};
