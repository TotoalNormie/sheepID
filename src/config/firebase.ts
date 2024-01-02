import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1PdGzDFinoaCZbOED8QJdpEHfaGGjtSI",
    authDomain: "sheep-id-937a1.firebaseapp.com",
    projectId: "sheep-id-937a1",
    storageBucket: "sheep-id-937a1.appspot.com",
    messagingSenderId: "237095957334",
    appId: "1:237095957334:web:95de434f16aa560194dcf7",
    measurementId: "G-XC1HY4ESQY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
