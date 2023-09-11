import React, { useState, useEffect } from 'react';

const ProtocolNotificationsBoard = ({ recipient }) => {
  const [notifications, setNotifications] = useState([]);
  const [protocol, setProtocol] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Make a POST request to get notifications
        const response = await fetch('http://localhost:8001/getNotificationsByWallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: recipient }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const notificationsData = await response.json();
        setNotifications(notificationsData);

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [recipient]);

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
            recipient: 'RI4TPJEMPVGP3O3FPKBS3IPOVJACXP2AT6E2V4WC7LPAQOGUUSW5UIFVZI',
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
    <div>
      <p className='ml-10 mt-5 text-3xl'>Send Notification</p>
      <div className="overflow-x-auto rounded-lg m-4 ml-10 mr-10">
        <form className="flex flex-col gap-2">
          <input
            type="text"
            className="m-10 h-[3.4rem] px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter Protocol"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
          />
        </form>

        <form className="flex flex-col gap-2">
          <input
            type="text"
            className="m-10 h-[3.4rem] px-4 flex items-center text-center border-2 border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring focus:ring-gray-500"
            placeholder="Enter Notification"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="ml-10 mb-10 h-[3rem] w-[19rem] px-4 flex items-center border-2 border-gray-700 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
            onClick={handleClick}
          >
            Send Notification
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProtocolNotificationsBoard;
