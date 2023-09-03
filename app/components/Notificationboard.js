import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            <p>Message: {notification.message}</p>
            <p>Protocol: {notification.protocolName}</p>
            <p>Time Sent: {notification.timeSent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsBoard;
