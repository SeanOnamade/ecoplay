import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAFFk5nVI9JrejprhEb0OYq6LlRBEku8Hc",
    authDomain: "ecoplay-48ab6.firebaseapp.com",
    projectId: "ecoplay-48ab6",
    storageBucket: "ecoplay-48ab6.firebasestorage.app",
    messagingSenderId: "1053297418898",
    appId: "1:1053297418898:web:d599f15c9168d3d5f53c4b"
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Error setting auth persistence:", error);
  });
