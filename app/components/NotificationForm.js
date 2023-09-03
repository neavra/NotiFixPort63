import React, { useState, useEffect } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { storage, database } from "../firebaseConfig";

const NotificationForm = () => {
  const [recipient, setRecipient] = useState("");
  const [protocol, setProtocol] = useState("");
  const [message, setMessage] = useState("");
  const [protocolOptions, setProtocolOptions] = useState([]);

//   useEffect(() => {
//     // Fetch protocol names from Firebase and update the state
//     const fetchProtocols = async () => {
//       const db = getFirestore();
//       const protocolsRef = collection(db, "protocols");
//       const querySnapshot = await getDocs(protocolsRef);
//       const options = [];
//       querySnapshot.forEach((doc) => {
//         const protocolData = doc.data();
//         options.push(protocolData.name);
//       });
//       setProtocolOptions(options);
//     };

//     fetchProtocols();
//   }, []);

  async function handleClick() {
    console.log(protocol, recipient, message);
    if (!protocol || !recipient || !message) {
      alert("Please fill out all required fields.");
      return;
    }
    // Create a notification in firebase
  }

  return (
    <form className="w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="protocol"
        >
          Protocol
        </label>
        <select
          className="border border-gray-400 p-2 w-full rounded-md"
          id="protocol"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
        >
          <option value="">Select Protocol</option>
          {protocolOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="recipient"
        >
          Recipient
        </label>
        <select
          className="border border-gray-400 p-2 w-full rounded-md"
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          <option value="">Select Recipient</option>
          <option value="recipient1">Recipient 1</option>
          <option value="recipient2">Recipient 2</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          className="border border-gray-400 p-2 w-full rounded-md"
          id="message"
          placeholder="Enter your notification message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        type="button"
        className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        onClick={handleClick}
      >
        Send Notification
      </button>
    </form>
  );
};

export default NotificationForm;
