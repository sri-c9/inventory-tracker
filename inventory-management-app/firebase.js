// /firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1Z3asdeJWqZVjetLROSJ7pbH_d5grrwk",
  authDomain: "inventory-management-f082f.firebaseapp.com",
  projectId: "inventory-management-f082f",
  storageBucket: "inventory-management-f082f.appspot.com",
  messagingSenderId: "811560379142",
  appId: "1:811560379142:web:7d661b07ffb93e9a617487",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export default firestore;
