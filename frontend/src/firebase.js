// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCszjW9qcD7OqlXLgOeQ134AHngGKuKW4M",
    authDomain: "harmonyai2.firebaseapp.com",
    projectId: "harmonyai2",
    storageBucket: "harmonyai2.firebasestorage.app",
    messagingSenderId: "1002116768465",
    appId: "1:1002116768465:web:2a944088381af10bb01bf0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Named exports (important!)
export const db = getFirestore(app);
export const auth = getAuth(app);