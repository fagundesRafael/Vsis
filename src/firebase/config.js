// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFzImAk2YStEgt0apqM5Z0gP3QFCKBdpo",
  authDomain: "vsis-a5f2d.firebaseapp.com",
  projectId: "vsis-a5f2d",
  storageBucket: "vsis-a5f2d.appspot.com",
  messagingSenderId: "1029608577415",
  appId: "1:1029608577415:web:d0c43e1ef939cc9c0d1b22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
