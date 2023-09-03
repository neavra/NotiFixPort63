import React, { useState, useEffect } from "react";

const NotificationForm = () => {
  const [recipient, setRecipient] = useState("");
  const [protocol, setProtocol] = useState("TestC");
  const [message, setMessage] = useState("");
  const [protocolOptions, setProtocolOptions] = useState([]);
  const [recipientOptions, setRecipientOptions] = useState([]);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await fetch('http://localhost:8001/getProtocols');
        if (!response.ok) {
          throw new Error('Failed to fetch protocols');
        }
        const data = await response.json();
        console.log(data); //process data properly here
        setProtocolOptions(data);
      } catch (error) {
        console.error('Error fetching protocols:', error);
      }
    };

    fetchProtocols();
  }, []);

  useEffect(() => {
    const fetchRecipients = async () => {
      if (protocol) {
        try {
          const response = await fetch('http://localhost:8001/getSubscriptionsByProtocol', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ protocolName: protocol }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch recipients');
          }
          const data = await response.json();
          setRecipientOptions(data);
        } catch (error) {
          console.error('Error fetching recipients:', error);
        }
      } else {
        setRecipientOptions([]);
      }
    };

    fetchRecipients();
  }, [protocol]);

  async function handleClick() {
    console.log(protocol, recipient, message);
    if (!protocol || !recipient || !message) {
      alert("Please fill out all required fields.");
      return;
    }
    const timeSent = new Date().toISOString();
    try {
        const response = await fetch('http://localhost:8001/setNotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            protocolName: protocol,
            recipient: recipient,
            message: message,
            status: "UNREAD",
            timeSent: timeSent,
          }),
        });
    
        if (response.status === 201) {
          alert("Notification sent successfully!");
          setProtocol("TestC");
          setRecipient("");
          setMessage("");
        } else {
          alert("Failed to send notification. Please try again later.");
        }
      } catch (error) {
        console.error('Error sending notification:', error);
        alert("An error occurred while sending the notification.");
      }
  }

  return (
    <form className="w-2/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="protocol">
                Protocol
            </label>
            <select
                className="border border-gray-400 p-2 w-full rounded-md"
                id="protocol"
                value={protocol}
                onChange={(e) => setProtocol(e.target.value)}
                style={{ color: "black" }}
            >
            <option value="">Select Protocol</option>
            {protocolOptions.map((option) => (
            <option key={option.id} value={option.id}>
                {option.name}
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
          style={{ color: "black" }}
        >
          <option value="">Select Recipient</option>
          {recipientOptions.map((option) => (
            <option key={option.walletAddress} value={option.walletAddress}>
              {option.walletAddress}
            </option>
          ))}
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
          style={{ color: "black" }}
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
