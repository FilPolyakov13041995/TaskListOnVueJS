/* eslint-disable prettier/prettier */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjZQ9HLItDVQQyFQnatdpzbiYeAYB2eh0",
  authDomain: "tasklistfil.firebaseapp.com",
  projectId: "tasklistfil",
  storageBucket: "tasklistfil.appspot.com",
  messagingSenderId: "303996506940",
  appId: "1:303996506940:web:3c920ab6d8ec9ce50d0439",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
