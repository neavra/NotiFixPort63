import React, { useState, useEffect } from 'react';

const NotificationsBoard = ({ recipient }) => {
  const [notifications, setNotifications] = useState([]);

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

  return (
    <div>
      <h1>Your Notifications</h1>
      <div className="notification-container">
        {notifications.map((notification, index) => (
          <div key={index} className="notification-card">
            <p className="notification-from">From: {notification.protocolName}</p>
            <div className="notification-message">{notification.message}</div>
            <p className="notification-time-sent">Time Sent: {notification.timeSent}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .notification-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .notification-card {
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 10px;
          padding: 10px;
          width: 300px;
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
        }

        .notification-from {
          font-weight: bold;
          color: #000;
        }

        .notification-message {
          margin-top: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          background-color: #fff;
          border-radius: 5px;
          color: #000;
        }

        .notification-time-sent {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default NotificationsBoard;
