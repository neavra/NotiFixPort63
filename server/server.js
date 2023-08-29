const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  getFirestore,
  addDoc,
  query,
  where,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const app = express();
const port = process.env.PORT || 8001;
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/', (req, res) => {
    return res.send('Hello from Express server!');
});

app.get('/getProtocols', async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "protocols"));
    const protocolsInfo = [];
    querySnapshot.forEach((doc) => {
      const protocolData = { id: doc.id, ...doc.data() };
      protocolsInfo.push(protocolData);
    });
    return res.send(protocolsInfo);
});

app.listen(port, () => console.log(`Express.js API listening on port ${port}`));
