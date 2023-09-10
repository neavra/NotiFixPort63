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
const emailHandler = require("./emailHandler");
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
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

app.get("/", (req, res) => {
  return res.send("Hello from Express server!");
});

app.get("/getProtocols", async (req, res) => {
  const querySnapshot = await getDocs(collection(db, "protocols"));
  const protocolsInfo = [];
  querySnapshot.forEach((doc) => {
    const protocolData = { id: doc.id, ...doc.data() };
    protocolsInfo.push(protocolData);
  });
  return res.send(protocolsInfo);
});

app.post("/getSubscriptionsByWallet", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const subscriptionsRef = collection(db, "subscriptions");
    const q = query(
      subscriptionsRef,
      where("walletAddress", "==", walletAddress)
    );

    const querySnapshot = await getDocs(q);

    const subscriptionsInfo = [];
    querySnapshot.forEach((doc) => {
      const subscriptionData = { id: doc.id, ...doc.data() };
      subscriptionsInfo.push(subscriptionData);
    });
    return res.json(subscriptionsInfo);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/getSubscriptionsByProtocol", async (req, res) => {
  try {
    const { protocolName } = req.body;

    if (!protocolName) {
      return res.status(400).json({ error: "Protocol name is required" });
    }

    const subscriptionsRef = collection(db, "subscriptions");
    const q = query(
      subscriptionsRef,
      where("protocolName", "==", protocolName)
    );

    const querySnapshot = await getDocs(q);

    const subscriptionsInfo = [];
    querySnapshot.forEach((doc) => {
      const subscriptionData = { id: doc.id, ...doc.data() };
      subscriptionsInfo.push(subscriptionData);
    });
    return res.json(subscriptionsInfo);
  } catch (error) {
    console.error("Error fetching subscriptions by protocolName:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setSubscription", async (req, res) => {
  try {
    const { walletAddress, protocolName, protocolDescription } = req.body;

    if (!walletAddress || !protocolName || !protocolDescription) {
      return res.status(400).json({
        error:
          "Missing walletAddress or protocolName or protocolDescription in request body",
      });
    }

    const subsciptionsCollection = collection(db, "subscriptions");

    const newSubsciptions = {
      walletAddress,
      protocolName,
      protocolDescription,
    };

    const subsciptionRef = await addDoc(
      subsciptionsCollection,
      newSubsciptions
    );

    return res.status(201).json({ id: subsciptionRef.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setUser", async (req, res) => {
  try {
    const { walletAddress, type } = req.body;

    if (!walletAddress || !type) {
      return res
        .status(400)
        .json({ error: "Missing walletAddress or type in request body" });
    }

    const usersCollection = collection(db, "users");

    const newUser = {
      walletAddress,
      type,
    };

    const userRef = await addDoc(usersCollection, newUser);

    return res.status(201).json({ id: userRef.id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setNotification", async (req, res) => {
  try {
    const { protocolName, recipient, message, status, timeSent } = req.body;

    if (!protocolName || !recipient || !message) {
      return res.status(400).json({
        error:
          "Missing protocolName, recipient, or message in the request body",
      });
    }

    const notificationsCollection = collection(db, "notifications");

    const newNotification = {
      protocolName,
      recipient,
      message,
      status,
      timeSent,
    };

    const notificationRef = await addDoc(
      notificationsCollection,
      newNotification
    );

    return res.status(201).json({ id: notificationRef.id });
  } catch (error) {
    console.error("Error creating notification:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/getNotificationsByWallet", async (req, res) => {
  try {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address is required" });
    }

    const notificationsRef = collection(db, "notifications");
    const q = query(notificationsRef, where("recipient", "==", walletAddress));

    const querySnapshot = await getDocs(q);

    const notificationsInfo = [];
    querySnapshot.forEach((doc) => {
      const notificationData = { id: doc.id, ...doc.data() };
      notificationsInfo.push(notificationData);
    });

    return res.json(notificationsInfo);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/setEmail", async (req, res) => {
  try {
    const { walletAddress, emailAddress } = req.body;

    if (!walletAddress || !emailAddress) {
      return res
        .status(400)
        .json({ error: "Missing walletAddress or email in request body" });
    }
    const querySnapshot = await getDocs(
      query(
        collection(db, "users"),
        where("walletAddress", "==", walletAddress)
      )
    );

    const userRef = querySnapshot.docs[0].ref;

    await updateDoc(userRef, { emailAddress: emailAddress });
    await emailHandler.sendEmail(
      emailAddress,
      "Email set for NotiFi",
      `Your Email has been set for NotiFi! You will now receive notifications from us via email.`
    );
    return res.status(201).json({ id: userRef.id });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Express.js API listening on port ${port}`));
