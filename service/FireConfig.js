// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importez la fonction getFirestore pour accéder à Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdPw6YPAAj6VVtJ0Ew69j6Bz2jFOtxjzs",
  authDomain: "dbpartymanager.firebaseapp.com",
  projectId: "dbpartymanager",
  storageBucket: "dbpartymanager.appspot.com",
  messagingSenderId: "134573845603",
  appId: "1:134573845603:web:d8d882ef50e9916e87dc56",
  measurementId: "G-XJVHX0P390"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Obtention d'une instance de Firestore
const db = getFirestore(app); // Initialisez Firestore en utilisant l'instance de l'application Firebase

export default db;