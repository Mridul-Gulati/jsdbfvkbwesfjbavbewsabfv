// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCysZ9PykSWdY_Eu48d4oP04MvCV43OelY",
    authDomain: "assignment-d75df.firebaseapp.com",
    projectId: "assignment-d75df",
    storageBucket: "assignment-d75df.appspot.com",
    messagingSenderId: "109208663175",
    appId: "1:109208663175:web:2b0c4c8f73513225f23422"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);