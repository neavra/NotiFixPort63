// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirebase, getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
require("dotenv").config();
const firebaseConfig = {
  apiKey: "AIzaSyAlz4BWcXgEe3_-dVmhD1gpmdelFQXHmJI",
  authDomain: "notifi-port63.firebaseapp.com",
  projectId: "notifi-port63",
  storageBucket: "notifi-port63.appspot.com",
  messagingSenderId: "53561718130",
  appId: "1:53561718130:web:5de44e276b39d2527499eb"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export { app, database, storage };