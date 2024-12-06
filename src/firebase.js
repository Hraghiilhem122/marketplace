// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAefQHb8TUtklszlQQOv3fgkY_Pivh02_Q",
  authDomain: "marketplace-b0ce9.firebaseapp.com",
  projectId: "marketplace-b0ce9",
  storageBucket: "marketplace-b0ce9.appspot.com", // Correction ici : utilisez "appspot.com" pour Firestore et Storage
  messagingSenderId: "787594387245",
  appId: "1:787594387245:web:9fb34d7fc7d0c81a4e7da4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtenir des instances des services Firebase
const auth = getAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app); // Initialiser Firestore
const db = getFirestore(app); // Initialisez Firestore

export { auth, storage, firestore, db};
